<?php
/**
 * Auth Check Endpoint
 * GET /api/auth/check.php
 * Headers: Authorization: Bearer <token>
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();

jsonResponse([
    'success' => true,
    'user' => [
        'id' => $user['user_id'],
        'username' => $user['username'],
        'full_name' => $user['full_name'],
        'email' => $user['email'],
        'role' => $user['role']
    ]
]);
