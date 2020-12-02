function Car(make, model) {
    var self = this
    self.make = make
    self.model = model

    // Chỉ cần đoạn này thôi
    riot.observable(self)

    // Đoạn sau không cần
    //self.started = false

    /*
    self.on('start', function () {
        self.started = true
    })
    */
}

// make a new Car instance
var car = new Car('Ford', 'Focus')