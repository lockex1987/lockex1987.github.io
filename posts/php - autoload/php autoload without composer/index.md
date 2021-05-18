## Bạn không nhất thiết cần Composer

Đường hiểu nhầm tôi, Composer là một sản phẩm phi thường. Nó có API dễ sử dụng để autoload nhanh, hỗ trợ nhiều chuẩn, có sẵn trình tối ưu autoload. Nó thậm chí còn cho phép bạn tìm kiếm và require các package dễ dàng. Đó là lý do Composer là package manager được sử dụng nhiều nhất cho PHP.

Bạn có thể mô phỏng việc Composer autoload bằng hàm `spl_autoload_register`.

Cấu trúc dự án của chúng ta là:

```
src
    *.php
public
    index.php
autoload.php
```

Thư mục `public` có file `index.php` là entry point cho front. Thư mục `src` chứa các file `php` nguồn. File `autoload.php` để xử lý việc autoload. Các class sẽ theo chuẩn PSR-4, với vendor namespace prefix được sử dụng như là key cho `$classmap`.

File `autoload.php`:

```php
<?php

define('PHP_NEXUS_VERSION', '0.0.1');

$classMap = [
    'PHPNexus' => __DIR__ . '/src/'
];

spl_autoload_register(function (string $className) use ($classMap) {
    $parts = explode('\\', $className);
    $namespace = array_shift($parts);
    $classFile = array_pop($parts) . '.php';
    
    if (! array_key_exists($namespace, $classMap)) {
        return;
    }
    
    $path = implode(DIRECTORY_SEPARATOR, $parts);
    $file = $classMap[$namespace] . $path . DIRECTORY_SEPARATOR . $classFile;
    
    if (! file_exists($file) && ! class_exists($className)) {
        return;
    }
    
    require_once $file;
});
```

File `public/index.php`:

```php
<?php

if (! defined('PHP_NEXUS_VERSION')) {
    require_once dirname(__DIR__) . '/autoload.php';
}

use PHPNexus\Composer\Demo;

$demo = new Demo();
echo $demo . PHP_EOL;
```

File src/Composer/Demo.php:

```php
<?php
    
namespace PHPNexus\Composer;

class Demo
{
    public function __toString(): string
    {
        return 'Composer Demo';
    }
}
```



Thực thi:

```bash
$ php index.php
```





Bài viết gốc:

[You don’t necessarily need Composer](https://dev.to/thinkverse/you-don-t-necessarily-need-composer-n71)

