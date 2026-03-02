<?php
require_once 'config.php';

$db = getDB();
$stmt = $db->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
$stmt->execute(['$2y$10$7l8Eh8G.B2WKOxu4ikWXZuHkNofwQQqOD7KXv.lP/02ys/59BwFD6', 'admin']);
echo "Password reset to 'admin123' successfully!";
?>
