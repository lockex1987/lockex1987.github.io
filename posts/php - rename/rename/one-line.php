<?php

for ($i = 0; $i < 10; $i++) {
    echo chr(27) . "[0G";
    // echo chr(27) . "[2A";
    echo $i;
    sleep(1);
}

echo PHP_EOL . 'Done' . PHP_EOL;
