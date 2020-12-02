<?php
echo (PHP_INT_SIZE * 8) . "bit\n";

echo ZEND_THREAD_SAFE . "\n";

if (ZEND_THREAD_SAFE) {
    echo 'Thread safe' . "\n";
} else {
    echo 'Not thread safe' . "\n";
}
