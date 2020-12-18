let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let jobTitle = faker.name.jobTitle();
let prefix = faker.name.prefix(); 
let suffix = faker.name.suffix();
let jobArea = faker.name.jobArea();
faker.name.findName();
faker.name.title();

let phone = faker.phone.phoneNumber();

console.log(`Employee: ${prefix} ${firstName} ${lastName} ${suffix}`);
console.log(`Job title: ${jobTitle}`);
console.log(`Job area: ${jobArea}`);
console.log(`Phone: ${phone}`);

let futureDate = faker.date.future();
let recentDate = faker.date.recent();
let weekday = faker.date.weekday();

console.log(futureDate);
console.log(recentDate);
console.log(weekday);

let number = faker.random.number();
faker.random.number({ min: 5, max: 20 });
let uuid = faker.random.uuid();
let word = faker.random.word();
let words = faker.random.words(6);
faker.random.boolean();

console.log(number);
console.log(uuid);
console.log(word);
console.log(words);

let email = faker.internet.email();
faker.internet.domainName()
faker.internet.userName();
faker.internet.url();

console.log(email);

faker.lorem.sentence()

faker.company.catchPhraseNoun()

faker.lorem.sentences();

faker.image.image();

faker.lorem.paragraphs().repeat(10);



faker.finance.account();

