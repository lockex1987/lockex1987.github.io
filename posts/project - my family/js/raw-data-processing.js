// Thêm các thông tin mà thư viện dTree cần
// Ngoài ra còn có thuộc tính relTo
people.forEach((person) => {
    Object.assign(person, {
        name: person.fullName,
        class: person.gender + ' person p-' + person.code,
        marriages: [],
        extra: {
            code: person.code
        },
        relTo: {}
    });
});

// Xử lý từng hôn nhân
// Đẩy dữ liệu spouse, children vào marriages
// Cập nhật các link father, mother, siblings cho các con
// Cập nhật các link directChildren (thư viện dTree đã dùng thuộc tính children), spouse, husband, wife cho bố và mẹ
marriages.forEach(marry => {
    // Lấy ra người nam và người nữ (bố và mẹ)
    const p1 = personMap[marry.couple[0]];
    const p2 = personMap[marry.couple[1]];
    let male, female;
    if (p1.gender == 'male') {
        male = p1;
        female = p2;
    } else {
        male = p2;
        female = p1;
    }

    // Danh sách con
    const children = [];
    marry.children.forEach(childCode => {
        const child = personMap[childCode];
        child.father = male;
        child.mother = female;
        child.relTo[male.code] = 'father';
        child.relTo[female.code] = 'mother';
        if (child.gender == 'male') {
            male.relTo[childCode] = 'son';
            female.relTo[childCode] = 'son';
        } else {
            male.relTo[childCode] = 'daughter';
            female.relTo[childCode] = 'daughter';
        }
        children.push(child);
    });

    children.forEach(child => {
        child.siblings = children;
    });

    // Xử lý mẹ
    female.marriages.push({
        spouse: male,
        children: children
    });
    female.directChildren = children;
    female.spouse = male;
    female.husband = male;
    female.relTo[male.code] = 'husband';

    // Xử lý bố
    male.marriages.push({
        spouse: female,
        children: children
    });
    male.directChildren = children;
    male.spouse = female;
    male.wife = female;
    male.relTo[female.code] = 'wife';

    // Tính toán thuộc tính relTo để sau này xác định quan hệ cho dễ
    children.forEach((child1, idx1) => {
        children.forEach((child2, idx2) => {
            if (idx1 != idx2) {
                if (idx1 > idx2) {
                    if (child2.gender == 'male') {
                        child1.relTo[child2.code] = 'olderBrother';
                    } else {
                        child1.relTo[child2.code] = 'olderSister';
                    }
                } else {
                    if (child2.gender == 'male') {
                        child1.relTo[child2.code] = 'youngerBrother';
                    } else {
                        child1.relTo[child2.code] = 'youngerSister';
                    }
                }
            }
        });
    });
});

// console.log(people);
