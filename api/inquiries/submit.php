<?php
/**
 * Submit Inquiry Endpoint (PUBLIC - no auth required)
 * POST /api/inquiries/submit.php
 * Body: { full_name, email, phone, message }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$data = getRequestBody();
$fullName = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$message = trim($data['message'] ?? '');

// Validation
$errors = [];
if (empty($fullName)) $errors[] = 'Full name is required';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (empty($message)) $errors[] = 'Message is required';

if (!empty($errors)) {
    jsonResponse(['success' => false, 'errors' => $errors], 400);
}

$db = getDB();
$stmt = $db->prepare("INSERT INTO inquiries (full_name, email, phone, message) VALUES (?, ?, ?, ?)");
$stmt->execute([$fullName, $email, $phone, $message]);

jsonResponse([
    'success' => true,
    'message' => 'Your inquiry has been submitted successfully. We will get back to you soon!'
], 201);
