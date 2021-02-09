<?php

$weight = 300;
$fontWeight = match ($weight) {
    100 => 'Super Thin',
    300 => 'Thin',
    400 => 'Normal',
    600 => 'Bold',
    900 => 'Heavy'
  };

  echo $fontWeight . PHP_EOL;
  