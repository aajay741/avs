<?php
/**
 * Update Inquiry Status Endpoint
 * POST /api/inquiries/update.php
 * Headers: Authorization: Bearer <token>
 * Body: { id, status }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$data = getRequestBody();
$id = $data['id'] ?? null;
$status = $data['status'] ?? null;

if (!$id || !$status) {
    jsonResponse(['success' => false, 'error' => 'ID and status are required'], 400);
}

$validStatuses = ['new', 'read', 'replied', 'archived'];
if (!in_array($status, $validStatuses)) {
    jsonResponse(['success' => false, 'error' => 'Invalid status'], 400);
}

$repliedAt = ($status === 'replied') ? date('Y-m-d H:i:s') : null;

$stmt = $db->prepare("UPDATE inquiries SET status = ?, replied_at = COALESCE(?, replied_at) WHERE id = ?");
$stmt->execute([$status, $repliedAt, $id]);

jsonResponse(['success' => true, 'message' => 'Inquiry status updated']);
