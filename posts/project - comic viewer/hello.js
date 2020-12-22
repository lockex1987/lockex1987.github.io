/*
373  cd comix-4.0.4/
sudo cp comix.desktop /usr/share/applications/
sudo gedit /usr/share/applications/comix.desktop
sudo cp images/16x16/comix.png /usr/share/icons/hicolor/16x16/apps/
sudo cp images/22x22/comix.png /usr/share/icons/hicolor/22x22/apps/
sudo cp images/24x24/comix.png /usr/share/icons/hicolor/24x24/apps/
sudo cp images/32x32/comix.png /usr/share/icons/hicolor/32x32/apps/
sudo cp images/48x48/comix.png /usr/share/icons/hicolor/48x48/apps/
sudo cp images/comix.svg /usr/share/icons/hicolor/scalable/apps/
sudo cp images/48x48/comix.png /usr/share/pixmaps/
*/
const http = require('http');
// import http from 'http';

const hostname = 'localhost';
const port = 3000;

const name = process.argv.join(',');
// 0 - /home/lockex1987/program/node/bin/node
// 1 - /home/lockex1987/hello.js
// 2 - /home/lockex1987/new/deluge application.png

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!' + name + '\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

