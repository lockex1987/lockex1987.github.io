class BaseModel {

	constructor(options, data) {
		this.name = 'Base';
		this.url = 'https://lockex1987.github.io';
		this.options = options;
		this.data = data;
	}

	getName() {
		return this.name;
	}
}

class AccountModel extends BaseModel {

}

var base = new BaseModel();
console.log('Name of base: ' + base.getName());

/*
var PersonEs5 = function(name, age) {
	this.name = name;
	this.age = age;
}

PersonEs5.prototype.stringSentence = function() {
	return 'Name: ' + this.name + ', age: ' + this.age;
}
*/
class PersonEs6 {

	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	stringSentence() {
		return 'Name: ' + this.name + ', age: ' + this.age;
	}
}

//var obj5 = PersonEs5('Huyen', 30);
var obj6 = new PersonEs6('Duong', 25);

//console.log(obj5.stringSentence());
console.log(obj6.stringSentence());
