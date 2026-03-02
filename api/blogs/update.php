<?php
/**
 * Blog Update Endpoint
 * POST /api/blogs/update.php
 * Headers: Authorization: Bearer <token>
 * Body: { id, title, content, excerpt, category, status, featured_image }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$data = getRequestBody();
$id = $data['id'] ?? null;

if (!$id) {
    jsonResponse(['success' => false, 'error' => 'Blog ID is required'], 400);
}

// Check if blog exists
$stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
$stmt->execute([$id]);
$blog = $stmt->fetch();

if (!$blog) {
    jsonResponse(['success' => false, 'error' => 'Blog post not found'], 404);
}

$title = trim($data['title'] ?? $blog['title']);
$content = $data['content'] ?? $blog['content'];
$excerpt = $data['excerpt'] ?? $blog['excerpt'];
$category = $data['category'] ?? $blog['category'];
$status = $data['status'] ?? $blog['status'];
$featuredImage = $data['featured_image'] ?? $blog['featured_image'];

// Update slug if title changed
$slug = $blog['slug'];
if ($title !== $blog['title']) {
    $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $title));
    $slug = trim($slug, '-');
}

// Set published_at if newly published
$publishedAt = $blog['published_at'];
if ($status === 'published' && $blog['status'] !== 'published') {
    $publishedAt = date('Y-m-d H:i:s');
}

$stmt = $db->prepare("
    UPDATE blog_posts 
    SET title = ?, slug = ?, content = ?, excerpt = ?, featured_image = ?, status = ?, category = ?, published_at = ?
    WHERE id = ?
");
$stmt->execute([$title, $slug, $content, $excerpt, $featuredImage, $status, $category, $publishedAt, $id]);

jsonResponse([
    'success' => true,
    'message' => 'Blog post updated successfully'
]);
