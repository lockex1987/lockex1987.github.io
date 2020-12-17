// Map giữa mã người và đối tượng người,
// để sau này truy cập cho nhanh
// đỡ phải viết hàm getPersonByCode
const personMap = {};

people.forEach((person) => {
    personMap[person.code] = person;
});
