<?php

function demoRange()
{
    print_r(range(0, 5));
    print_r(range(5, 0));
    print_r(range(0, 50, 10));
    print_r(range('a', 'd'));
}


print_r(array_fill(3, 4, 'blue'));
print_r(array_fill_keys(['a', 'b', 'c', 'd'], 'blue'));

// demoRange();
