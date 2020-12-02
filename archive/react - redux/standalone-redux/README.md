npm install redux
npm install --save-dev @babel/core @babel/cli
npm install --save-dev @babel/preset-env
npm install --save-dev babel-preset-es2015

npm run build


babel --presets es2015 -d lib/ src
babel src/app.js --out-file dist/app-compiled.js
babel src/app.js --watch --out-file dist/app-compiled.js
babel src --out-dir dist
