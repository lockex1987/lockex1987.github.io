package common.pdf.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;

import org.apache.commons.lang3.StringUtils;
import org.docx4j.XmlUtils;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.wml.ContentAccessor;
import org.docx4j.wml.P;
import org.docx4j.wml.Tbl;
import org.docx4j.wml.Text;
import org.docx4j.wml.Tr;

public class Docx4jDemo {

	public static void main(String[] args) {
		new Docx4jDemo();
		System.out.println("Finish");
	}

	public Docx4jDemo() {
		try {
			WordprocessingMLPackage template = getTemplate("input/template.docx");

			replacePlaceholder("SJ_EX1", "Thùy\nDương", template);

			//replaceParagraph("SJ_EX2", "Thùy\nDương", template, template.getMainDocumentPart());

			// Map<String, String> repl1 = new HashMap<String, String>();
			// repl1.put("SJ_FUNCTION", "function1");
			// repl1.put("SJ_DESC", "desc1");
			// repl1.put("SJ_PERIOD", "period1");
			//
			// Map<String, String> repl2 = new HashMap<String, String>();
			// repl2.put("SJ_FUNCTION", "function2");
			// repl2.put("SJ_DESC", "desc2");
			// repl2.put("SJ_PERIOD", "period2");
			//
			// Map<String, String> repl3 = new HashMap<String, String>();
			// repl3.put("SJ_FUNCTION", "function3");
			// repl3.put("SJ_DESC", "desc3");
			// repl3.put("SJ_PERIOD", "period3");
			//
			// replaceTable(new String[] { "SJ_FUNCTION", "SJ_DESC", "SJ_PERIOD"
			// }, Arrays.asList(repl1, repl2, repl3),
			// template);

			writeDocxToStream(template, "output/output.docx");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private WordprocessingMLPackage getTemplate(String name) throws Docx4JException, FileNotFoundException {
		WordprocessingMLPackage template = WordprocessingMLPackage.load(new FileInputStream(new File(name)));
		return template;
	}

	private static List<Object> getAllElementFromObject(Object obj, Class<?> toSearch) {
		List<Object> result = new ArrayList<Object>();
		if (obj instanceof JAXBElement) {
			obj = ((JAXBElement<?>) obj).getValue();
		}
		if (obj.getClass().equals(toSearch)) {
			result.add(obj);
		} else if (obj instanceof ContentAccessor) {
			List<?> children = ((ContentAccessor) obj).getContent();
			for (Object child : children) {
				result.addAll(getAllElementFromObject(child, toSearch));
			}
		}
		return result;
	}

	private void replacePlaceholder(String placeholder, String name, WordprocessingMLPackage template) {
		List<Object> texts = getAllElementFromObject(template.getMainDocumentPart(), Text.class);
		for (Object text : texts) {
			Text textElement = (Text) text;
			if (textElement.getValue().equals(placeholder)) {
				textElement.setValue(name);
			}
		}
	}

	private void writeDocxToStream(WordprocessingMLPackage template, String target)
			throws IOException, Docx4JException {
		File f = new File(target);
		template.save(f);
	}

	private void replaceParagraph(String placeholder, String textToAdd, WordprocessingMLPackage template,
			ContentAccessor addTo) {
		// 1. get the paragraph
		List<Object> paragraphs = getAllElementFromObject(template.getMainDocumentPart(), P.class);
		P toReplace = null;
		for (Object p : paragraphs) {
			List<Object> texts = getAllElementFromObject(p, Text.class);
			for (Object t : texts) {
				Text content = (Text) t;
				if (content.getValue().equals(placeholder)) {
					toReplace = (P) p;
					break;
				}
			}
		}

		// we now have the paragraph that contains our placeholder: toReplace
		// 2. split into seperate lines
		String as[] = StringUtils.splitPreserveAllTokens(textToAdd, '\n');
		for (int i = 0; i < as.length; i++) {
			String ptext = as[i];

			// 3. copy the found paragraph to keep styling correct
			P copy = (P) XmlUtils.deepCopy(toReplace);

			// replace the text elements from the copy
			List<?> texts = getAllElementFromObject(copy, Text.class);
			if (texts.size() > 0) {
				Text textToReplace = (Text) texts.get(0);
				textToReplace.setValue(ptext);
			}

			// add the paragraph to the document
			addTo.getContent().add(copy);
		}

		// 4. remove the original one
		((ContentAccessor) toReplace.getParent()).getContent().remove(toReplace);
	}

	private void replaceTable(String[] placeholders, List<Map<String, String>> textToAdd,
			WordprocessingMLPackage template) throws Docx4JException, JAXBException {
		List<Object> tables = getAllElementFromObject(template.getMainDocumentPart(), Tbl.class);

		// 1. find the table
		Tbl tempTable = getTemplateTable(tables, placeholders[0]);
		List<Object> rows = getAllElementFromObject(tempTable, Tr.class);

		// first row is header, second row is content
		if (rows.size() == 2) {
			// this is our template row
			Tr templateRow = (Tr) rows.get(1);

			for (Map<String, String> replacements : textToAdd) {
				// 2 and 3 are done in this method
				addRowToTable(tempTable, templateRow, replacements);
			}

			// 4. remove the template row
			tempTable.getContent().remove(templateRow);
		}
	}

	private Tbl getTemplateTable(List<Object> tables, String templateKey) throws Docx4JException, JAXBException {
		for (Iterator<Object> iterator = tables.iterator(); iterator.hasNext();) {
			Object tbl = iterator.next();
			List<?> textElements = getAllElementFromObject(tbl, Text.class);
			for (Object text : textElements) {
				Text textElement = (Text) text;
				if (textElement.getValue() != null && textElement.getValue().equals(templateKey)) {
					return (Tbl) tbl;
				}
			}
		}
		return null;
	}

	private static void addRowToTable(Tbl reviewtable, Tr templateRow, Map<String, String> replacements) {
		Tr workingRow = (Tr) XmlUtils.deepCopy(templateRow);
		List<?> textElements = getAllElementFromObject(workingRow, Text.class);
		for (Object object : textElements) {
			Text text = (Text) object;
			String replacementValue = (String) replacements.get(text.getValue());
			if (replacementValue != null)
				text.setValue(replacementValue);
		}
		reviewtable.getContent().add(workingRow);
	}
}
