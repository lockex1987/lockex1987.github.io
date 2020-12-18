# ES6

This demonstrates [how to use ES6 in your tags](https://riot.js.org/guide/compiler/#pre-processors) using the in-browser compiler.

If you use ES6, TypeScript, CoffeeScript, or any JavaScript pre-processor, **it will override the one built in to Riot**.

That means you will lose the shorthand syntax. So this:

```javascript
getMessage() { ... }
```

Becomes (using ES6):

```javascript
this.getMessage = function () { ... }
// or
this.getMessage = () => { ... }
```

*Please don't use in-browser Babel for production. Read the Riot docs for prebuilt ES6 tags.*

