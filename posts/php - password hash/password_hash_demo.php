<?php
// Hash
echo password_hash("rasmuslerdorf", PASSWORD_DEFAULT) . "\n";
echo password_hash("rasmuslerdorf", PASSWORD_BCRYPT) . "\n";

// Verify
$hash = '$2y$07$BCryptRequires22Chrcte/VlQH0piJtjXl.0t1XkA8pw9dMXTpOq';

if (password_verify('rasmuslerdorf', $hash)) {
    echo 'Password is valid!' . "\n";
} else {
    echo 'Invalid password.' . "\n";
}
?>