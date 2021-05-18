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
    echo $file . PHP_EOL;
    
    if (! file_exists($file) && ! class_exists($className)) {
        return;
    }
    
    require_once $file;
});
