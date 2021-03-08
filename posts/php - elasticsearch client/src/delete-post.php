<?php

function deleteData($client)
{
    $resp = $client->delete([
        'index' => 'gov',
        'id' => '1'
    ]);
    var_dump($resp);
}

// deleteData();
