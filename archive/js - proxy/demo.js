function demo1() {
    const target = {
        a: 1,
        b: 2,
        c: 3
    };

    const handler = {
        get: function (target, name) {
            return (
                name in target ? target[name] : 42
            );
        }
    };

    const proxy = new Proxy(target, handler);

    console.log(proxy.a);  // 1
    console.log(proxy.b);  // 2
    console.log(proxy.c);  // 3
    console.log(proxy.meaningOfLife);  // 42
}

function demo2() {
    const target = {
        a: 1,
        b: 2,
        c: 3
    };

    const handler = {
        get: function (target, name) {
            return (name in target ? target[name] : 42);
        },

        set: function (target, prop, value) {
            if (prop.length == 1 && prop >= 'a' && prop <= 'z') {
                target[prop] = value;
                return true;
            }
            else {
                throw new ReferenceError(prop + ' cannot be set');
                return false;
            }
        }
    };

    const proxy = new Proxy(target, handler);

    proxy.a = 10;
    proxy.b = 20;
    proxy.ABC = 30;
    // Exception: ReferenceError: ABC cannot be set
}

//demo2();

function demo3() {
    const sum = (a, b) => a + b
    const f = new Proxy(sum, {
        apply(target, thisArg, args) {
            const [a, b] = args
            return target.call(thisArg, a * 2, b * 2)
        }
    })

    var n = f(1, 2);
    console.log(n); // 6
}

demo3();
