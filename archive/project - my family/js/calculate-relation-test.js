function calculateSomeRelations() {
    console.log(calculateRelation('HUYEN', 'DUONG'));
    console.log(calculateRelation('DUONG', 'HUYEN'));
    console.log(calculateRelation('HOANH', 'DUONG'));
    console.log(calculateRelation('CHAT', 'DUONG'));

    console.log(calculateRelation('HUYEN', 'HOANH'));
    console.log(calculateRelation('HOANH', 'HUYEN'));
    console.log(calculateRelation('CHAT', 'HUYEN'));

    console.log(calculateRelation('BANGOAI', 'HUYEN'));
    console.log(calculateRelation('HUYEN', 'BANGOAI'));

    console.log(calculateRelation('NAM', 'HUYEN'));
    console.log(calculateRelation('HUYEN', 'NAM'));
    console.log(calculateRelation('NAM', 'DUYEN'));

    console.log(calculateRelation('HUYEN', 'CHI'));
    console.log(calculateRelation('HUYEN', 'HANAM'));
    console.log(calculateRelation('HANAM', 'HUYEN'));
}

function calculateAllRelations() {
    var count = 0;
    for (var p1 in personMap) {
        // if (count == 4) {
        for (var p2 in personMap) {
            if (p1 != p2) {
                var relation = calculateRelation(p1, p2);
                // if (relation == 'UNK') {
                // console.log(p1, 'là', relation, p2);
                // }
            }
        }
        // }
        count++;
    }
}

// calculateSomeRelations();
calculateAllRelations();