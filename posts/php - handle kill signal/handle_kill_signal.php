<?php

// Trên Windows không có
if (function_exists('pcntl_async_signals')) {
    function signal_handler($signal)
    {
        switch ($signal) {
        case SIGTERM:
            print "Caught SIGTERM\n";
            exit;
        case SIGKILL:
            print "Caught SIGKILL\n";
            exit;
        case SIGINT:
            print "Caught SIGINT\n";
            exit;
        }
    }

    declare(ticks = 1);
    pcntl_async_signals(true);
    pcntl_signal(SIGTERM, "signal_handler");
    pcntl_signal(SIGINT, "signal_handler");
}

while (1) {
}
