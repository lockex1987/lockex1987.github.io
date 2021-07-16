<?php

function simpleDemo()
{
    $str = '';
    // Dùng nowdoc (có dấu nháy) để không escape các biến ở xâu
    $phpCode = <<<'PHP'
        $str = 'https://www.php.net/manual/en/function.eval.php';
        PHP;

    echo $phpCode . PHP_EOL;
    eval($phpCode);
    echo $str . PHP_EOL;
}


function demoReturnValue()
{
    $rs1 = eval('$a = 1;');
    $rs2 = eval('$b = 2; return $b;');
    echo $rs1 . PHP_EOL;
    echo $rs2 . PHP_EOL;
}


function checkPhpCode(string $phpCode)
{
    // Remove whitespaces
    $phpCode = preg_replace('/\s+/', '', $phpCode);

    $number = '(?:\d+(?:[,.]\d+)?|pi|π)'; // What is a number
    $functions = '(?:sinh?|cosh?|tanh?|abs|acosh?|asinh?|atanh?|exp|log10|deg2rad|rad2deg|sqrt|ceil|floor|round)'; // Allowed PHP functions
    $operators = '[+\/*\^%-]'; // Allowed math operators
    $regexp = '/^((' . $number . '|' . $functions . '\s*\((?1)+\)|\((?1)+\))(?:' . $operators . '(?2))?)+$/'; // Final regexp, heavily using recursive patterns

    if (preg_match($regexp, $phpCode)) {
        echo '1' . PHP_EOL;
        $phpCode = preg_replace('!pi|π!', 'pi()', $phpCode); // Replace pi with pi function
        eval('$result = ' . $phpCode . ';');
    } else {
        echo '2' . PHP_EOL;
        $result = false;
    }
    // return $result;
    return $result ? 'true' : 'false';
}


function dynamicCalculateSalary()
{
    $inputs = [
        'employee_id' => 1,
        'working_days' => 2
    ];
    $outputs = [];
    $formula = <<<'PHP'
        $outputs['employee_id'] = $inputs['employee_id'];
        $outputs['working_days'] = $inputs['working_days'];
        $price = 100;
        $outputs['salary'] = $inputs['working_days'] * $price;
        PHP;
    eval($formula);
    print_r($outputs);
}


// simpleDemo();
// demoReturnValue();
// echo checkPhpCode('2+3*pi') . PHP_EOL;
// echo checkPhpCode('2+3*pi-') . PHP_EOL;
dynamicCalculateSalary();
