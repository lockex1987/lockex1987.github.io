<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use SplObjectStorage;
use Exception;

class Chat implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new SplObjectStorage();
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection $conn->resourceId" . PHP_EOL;
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        echo sprintf('Connection %d sending message "%s"' . PHP_EOL, $from->resourceId, $msg);
        foreach ($this->clients as $receiver) {
            if ($from !== $receiver) {
                $receiver->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected" . PHP_EOL;
    }

    public function onError(ConnectionInterface $conn, Exception $ex)
    {
        echo "An error has occurred: {$ex->getMessage()}\n";
        $conn->close();
    }
}
