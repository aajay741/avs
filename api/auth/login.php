<?php
/**
 * Admin Login Endpoint
 * POST /api/auth/login.php
 * Body: { username, password }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$data = getRequestBody();
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    jsonResponse(['success' => false, 'error' => 'Username and password are required'], 400);
}

$db = getDB();

// Find user
$stmt = $db->prepare("SELECT * FROM admin_users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    jsonResponse(['success' => false, 'error' => 'Invalid credentials'], 401);
}

// Generate session token
$token = generateToken();
$expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));

// Clean up old sessions for this user
$db->prepare("DELETE FROM admin_sessions WHERE user_id = ? OR expires_at < NOW()")->execute([$user['id']]);

// Create new session
$stmt = $db->prepare("INSERT INTO admin_sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
$stmt->execute([$user['id'], $token, $expiresAt]);

// Update last login
$db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?")->execute([$user['id']]);

jsonResponse([
    'success' => true,
    'token' => $token,
    'user' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'full_name' => $user['full_name'],
        'email' => $user['email'],
        'role' => $user['role']
    ]
]);
