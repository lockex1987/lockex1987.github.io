function generate() {
    const doc = new docx.Document();

    doc.addSection({
        properties: {},
        children: [
            new docx.Paragraph({
                children: [
                    new docx.TextRun('Hello World'),
                    new docx.TextRun({
                        text: 'Foo Bar',
                        bold: true,
                    }),
                    new docx.TextRun({
                        text: '\tGithub is the best',
                        bold: true,
                    })
                ]
            }),
            new docx.Paragraph('Detailed Report for San Luis Potosi'), // .title().center()
            new docx.Paragraph(`State Map`), // .heading1().thematicBreak().center()
        ]
    });

    /*
    // Add map image
    const map = 'data:image/png;base64';
    doc.createImage(map, 600, 250, {});

    // Add heading for attractions
    doc.addParagraph(new docx.Paragraph(`Tourist Attractions`).heading1().thematicBreak().center());

    // Bullet points
    const tourist_attractions = [
        'Tamtoc',
        'Sótano de las Golondrinas',
        'Cascada de Tamul'
    ];
    for (let attraction of tourist_attractions) {
        doc.addParagraph(new docx.Paragraph(attraction).bullet());
    }

    // Add heading for municipalities
    doc.addParagraph(new docx.Paragraph(`Municipalities`).heading1().thematicBreak().center());

    // Create table
    const municipalities = [
        { name: 'San Luis Potosi', population: 824000 },
        { name: 'Rio Verde', population: 160000 },
        { name: 'Cd Valles', population: 176000 },
        { name: 'Matehuala', population: 82726 }
    ];
    let municipalities_table = doc.createTable({
        rows: municipalities.length + 1,
        columns: 2,
        width: 100,
        widthUnitType: WidthType.AUTO,
        columnWidths: [2934, 2934],
    });
    municipalities_table.getCell(0, 0).addParagraph(new docx.Paragraph("Name"));
    municipalities_table.getCell(0, 1).addParagraph(new docx.Paragraph("Population"));

    for (let [index, municipality] of municipalities.entries()) {
        municipalities_table.getCell(index + 1, 0).addParagraph(new docx.Paragraph(municipality.name));
        municipalities_table.getCell(index + 1, 1).addParagraph(new docx.Paragraph(municipality.population));
    }
    */

    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'example.docx');
    });
}
