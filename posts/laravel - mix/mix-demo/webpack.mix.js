const mix = require('laravel-mix');

mix
    .js('src/js/app.js', 'public/js')
    .react('src/js/app.jsx', 'public/js/r.js')
    .sass('src/sass/app.scss', 'public/css')
    ;
