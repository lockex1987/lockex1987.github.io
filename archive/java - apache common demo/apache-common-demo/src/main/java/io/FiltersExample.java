package io;
import java.io.File;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOCase;
import org.apache.commons.io.filefilter.AndFileFilter;
import org.apache.commons.io.filefilter.NameFileFilter;
import org.apache.commons.io.filefilter.NotFileFilter;
import org.apache.commons.io.filefilter.OrFileFilter;
import org.apache.commons.io.filefilter.PrefixFileFilter;
import org.apache.commons.io.filefilter.SuffixFileFilter;
import org.apache.commons.io.filefilter.WildcardFileFilter;

public final class FiltersExample {

	private static final String PARENT_DIR = "/data/workspace/eclipse/ApacheCommon/ExampleFolder";

	public static void runExample() {
		System.out.println("File Filter example...");

		// NameFileFilter
		// Right now, in the parent directory we have 3 files:
		// directory example
		// file exampleEntry.txt
		// file exampleTxt.txt
		// Get all the files in the specified directory
		// that are named "example".
		File dir = FileUtils.getFile(PARENT_DIR);
		String[] acceptedNames = { "example", "exampleTxt.txt" };
		String[] list = dir.list(new NameFileFilter(acceptedNames, IOCase.INSENSITIVE));
		for (String file : list) {
			System.out.println("File found, named: " + file);
		}

		// WildcardFileFilter
		// We can use wildcards in order to get less specific results
		// ? used for 1 missing char
		// * used for multiple missing chars
		list = dir.list(new WildcardFileFilter("*ample*"));
		for (String file : list) {
			System.out.println("Wildcard file found, named: " + file);
		}

		// PrefixFileFilter
		// We can also use the equivalent of startsWith
		// for filtering files.
		list = dir.list(new PrefixFileFilter("example"));
		for (String file : list) {
			System.out.println("Prefix file found, named: " + file);
		}

		// SuffixFileFilter
		// We can also use the equivalent of endsWith
		// for filtering files.
		list = dir.list(new SuffixFileFilter(".txt"));
		for (String file : list) {
			System.out.println("Suffix file found, named: " + file);
		}

		// OrFileFilter
		// We can use some filters of filters.
		// in this case, we use a filter to apply a logical
		// or between our filters.
		list = dir.list(new OrFileFilter(new WildcardFileFilter("*ample*"), new SuffixFileFilter(".txt")));
		for (String file : list) {
			System.out.println("Or file found, named: " + file);
		}

		// And this can become very detailed.
		// Eg, get all the files that have "ample" in their name
		// but they are not text files (so they have no ".txt" extension.
		list = dir.list(new AndFileFilter( // we will match 2 filters...
		new WildcardFileFilter("*ample*"), // ...the 1st is a wildcard...
		new NotFileFilter(new SuffixFileFilter(".txt")))); // ...and the 2nd is NOT .txt.
		for (String file : list) {
			System.out.println("And/Not file found, named: " + file);
		}
	}
}