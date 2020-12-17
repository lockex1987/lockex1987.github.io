function positiveLookahead() {
    const people = `
            - Bob (vegetarian)
            - Billa (vegan)
            - Francis
            - Elli (vegetarian)
            - Fred (vegan)
            `;

    const regex = /-\s(\w+?)\s(?=\(vegan\))/g;
    //                |----|  |-----------|
    //                  /            \
    //           more than one        \
    //           word character      positive lookahead
    //           but as few as       => followed by "(vegan)"
    //           possible

    let result = regex.exec(people);

    while (result) {
        console.log(result[1]);
        result = regex.exec(people);
    }

    // Result:
    // Billa
    // Fred
}

function negativeLookahead() {
    const people = `
            - Bob (vegetarian)
            - Billa (vegan)
            - Francis
            - Elli (vegetarian)
            - Fred (vegan)
            `;

    const regex = /-\s(\w+)\s(?!\(vegan\))/g
    //                |---|  |-----------|
    //                  /          \
    //           more than one      \
    //           word character     negative lookahead
    //           but as few as      => not followed by "(vegan)"
    //           possible

    let result = regex.exec(people);

    while (result) {
        console.log(result[1]);
        result = regex.exec(people);
    }

    // Result:
    // Bob
    // Francis
    // Elli
}

function positiveLookbehind() {
    const people = `
            - (vegetarian) Bob
            - (vegan) Billa
            - Francis
            - (vegetarian) Elli
            - (vegan) Fred
            `;

    const regex = /(?<=\(vegan\))\s(\w+)/g
    //             |------------|  |---|  
    //                  /             \__
    //         positive lookbehind        \
    //       => following "(vegan)"     more than one
    //                                  word character
    //                                  but as few as possible

    let result = regex.exec(people);

    while (result) {
        console.log(result[1]);
        result = regex.exec(people);
    }

    // Result:
    // Billa
    // Fred
}


positiveLookahead();
console.log('---');
negativeLookahead();
console.log('---');
positiveLookbehind();