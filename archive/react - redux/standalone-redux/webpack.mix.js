let mix = require('laravel-mix');

// Không sử dụng Vue, React
// chỉ sử dụng mỗi Redux
mix
    .js('src/demo0.js', 'dist/')
    .js('src/demo1.js', 'dist/')
    .js('src/demo2.js', 'dist/')
    .setPublicPath('dist')
    ;
