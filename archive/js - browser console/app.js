// https://developers.google.com/web/tools/chrome-devtools/console/console-write
// https://developer.mozilla.org/en-US/docs/Web/API/Console

console.log("%c This Is Line One ", "font-family: Times New Roman,Times, serif");
console.log("%cThis Is Line One ", "font-size:30px");
console.log("%cThis Is Line One ", "font-style: italic");
console.log("%cThis Is Line One ", "font-weight: bold");
console.log("%cThis Is Line One ", "font-variant: small-caps");
console.log("%cThis is Overline %cThis is line through %c This is underline", "color: red; text-decoration: overline", "color: blue; text-decoration: line-through", "color:green; text-decoration: underline");
console.log("%cuppercase %cLOWERCASE %cThis is capitalized", "color: red; text-transform: uppercase", "color: green; text-transform: lowercase", "color: blue; text-transform: capitalize");
console.log("%cThis Is Line One \n %c This Is Line Two \n %c This Is Line Three", "line-height: 0.8;", "line-height: 1.7;", "line-height: 3;")
console.log("%cThis Is Line One ", "text-shadow: 3px 2px red;");
console.log('%c the green hulk got mad!', 'color: green; font-weight: bold;');
console.log("%c%s", "color: red; background: yellow; font-size: 24px;", "WARNING!");
console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');


function consoleColors(namespace = {}, userColors = {}) {
    const _log = console.log;
    const _clear = console.clear;

    const baseStyles = "border-radius:3px;";
    var colors = {
        white: "white",
        black: "black",
        silver: "silver",
        gray: "gray",
        red: "#E86C5D",
        green: "#74ED7B",
        blue: "#3F6FFB",
        gold: "gold",
        yellow: "yellow",
        pink: "pink",
        cyan: "cyan"
    };
    const lib = {
        big: 'font-size: 2em',
        bold: 'font-weight: bold',
        italic: 'font-style: italic',
        capitalize: 'text-transform: capitalize',
        shadow: 'text-shadow: -1px 1px rgba(0,0,0,.5)'
    };
    colors = Object.assign(colors, userColors);
    var styles = baseStyles; // chained styles (per "console" are stored here)

    // this will protect against non-existing methods names or typos so the chain will not be harmed
    const proxyC = new Proxy(namespace, {
        get: (target, prop) => prop in target ? target[prop] : namespace
    });

    // define chainable methods on the proxy object
    const define = (name, value) => {
        Reflect.defineProperty(proxyC, name, {
            get() {
                styles = styles + ";" + (typeof value == 'function' ? value() : value);
                return proxyC;
            }
        });
    };

    var getRandomProperty = function(obj) {
        var keys = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
    };

    const randomBg = (v) => `background:${v || getRandomProperty(colors)}; padding:0 .6 0 0`;
    const userColor = (v) => `color:${v || getRandomProperty(colors)}`;

    // add colors to the main lib
    for (let key in colors) {
        var bgKey = "bg" + key.replace(/\b\w/g, c => c.toUpperCase());
        lib[key] = `color:${colors[key]}`;
        lib[bgKey] = `background:${colors[key]}; padding:0 .6em 0 0`;
    }

    // add lib's properties as method getters on the console's proxy object
    for (let key in lib) {
        define(key, lib[key])
    }

    define('bg', randomBg);
    define('random', userColor);

    // Actual console wrapper methods
    proxyC.log = function() {
        var args = [...arguments],
            // non-primitive values cannot be styled unfortunately
            isValid = args.some(v => typeof v == "string" || typeof v == "number" || typeof v == "boolean" || typeof v == "symbol" || typeof v == "undefined" || v === null);

        if (isValid)
            _log("%c " + args.join(" "), styles);
        else
            _log(...args);

        styles = baseStyles;
    }

    proxyC.clear = function() {
        _clear();
        arguments[0] && proxyC.log.apply(null, arguments);
        styles = baseStyles;
    }

    proxyC.json = function () {
        const value = [...arguments].map(v => JSON.stringify(v)).join(" \n\n ");
        proxyC.log.call(null, value);
        styles = baseStyles;
    }

    // override the console with the overloaded proxyC
    return proxyC;
}

consoleColors(console, { warning: 'darkred' });


console.red.bgWhite.bold.capitalize.log("try it yourself");
console.white.bgRed.big.log("It's fun");
console.random.log(Date());
console.warning.log('warning');
