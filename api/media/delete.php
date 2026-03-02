<?php
/**
 * Media Delete Endpoint
 * DELETE /api/media/delete.php?id=X  or POST with { id: X }
 * Headers: Authorization: Bearer <token>
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

// Get ID from query or body
$id = $_GET['id'] ?? null;
if (!$id) {
    $data = getRequestBody();
    $id = $data['id'] ?? null;
}

if (!$id) {
    jsonResponse(['success' => false, 'error' => 'File ID is required'], 400);
}

// Get file info before deleting
$stmt = $db->prepare("SELECT * FROM media_files WHERE id = ?");
$stmt->execute([$id]);
$file = $stmt->fetch();

if (!$file) {
    jsonResponse(['success' => false, 'error' => 'File not found'], 404);
}

// Delete physical file
$filePath = UPLOAD_DIR . $file['file_name'];
if (file_exists($filePath)) {
    unlink($filePath);
}

// Delete from database
$stmt = $db->prepare("DELETE FROM media_files WHERE id = ?");
$stmt->execute([$id]);

jsonResponse(['success' => true, 'message' => 'File deleted successfully']);
