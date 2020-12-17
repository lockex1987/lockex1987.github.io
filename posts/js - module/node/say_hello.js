const sayHello = (name) => {
    console.log('Xin chào! Tên tôi là ' + name);
};


module.exports = {
    sayHello: sayHello
};


/*
exports = {
    sayHello: sayHello
};
*/

exports.NAME = 'Nguyễn Anh Tuấn';
//module.exports.NAME = 'Nguyễn Anh Tuấn';

// Không dùng được exports?
exports.goodbye = () => {
    console.log('Goodbye');
};

module.exports.AGE = 10;
