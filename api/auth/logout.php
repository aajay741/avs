<?php
/**
 * Admin Logout Endpoint
 * POST /api/auth/logout.php
 * Headers: Authorization: Bearer <token>
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';

if (!empty($authHeader) && str_starts_with($authHeader, 'Bearer ')) {
    $token = substr($authHeader, 7);
    $db = getDB();
    $db->prepare("DELETE FROM admin_sessions WHERE token = ?")->execute([$token]);
}

jsonResponse(['success' => true, 'message' => 'Logged out successfully']);
