<?php
/**
 * Blog Delete Endpoint
 * POST /api/blogs/delete.php
 * Headers: Authorization: Bearer <token>
 * Body: { id }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$data = getRequestBody();
$id = $data['id'] ?? $_GET['id'] ?? null;

if (!$id) {
    jsonResponse(['success' => false, 'error' => 'Blog ID is required'], 400);
}

$stmt = $db->prepare("SELECT id FROM blog_posts WHERE id = ?");
$stmt->execute([$id]);

if (!$stmt->fetch()) {
    jsonResponse(['success' => false, 'error' => 'Blog post not found'], 404);
}

$db->prepare("DELETE FROM blog_posts WHERE id = ?")->execute([$id]);

jsonResponse(['success' => true, 'message' => 'Blog post deleted successfully']);
