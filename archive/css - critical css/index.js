// index.js
const critical = require('critical');
critical.generate({
  src: 'https://lockex1987.github.io/',
  width: 1300,
  height: 900,
  inline: false
}, (err, criticalCSS) => {
  console.log(criticalCSS);
});

// run on command line:
// node index.js
