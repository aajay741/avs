<?php
/**
 * Blog Create Endpoint
 * POST /api/blogs/create.php
 * Headers: Authorization: Bearer <token>
 * Body: { title, content, excerpt, category, status, featured_image }
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$data = getRequestBody();
$title = trim($data['title'] ?? '');
$content = $data['content'] ?? '';
$excerpt = $data['excerpt'] ?? '';
$category = $data['category'] ?? 'General';
$status = $data['status'] ?? 'draft';
$featuredImage = $data['featured_image'] ?? null;

if (empty($title)) {
    jsonResponse(['success' => false, 'error' => 'Title is required'], 400);
}

// Generate slug
$slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $title));
$slug = trim($slug, '-');

// Check slug uniqueness
$check = $db->prepare("SELECT id FROM blog_posts WHERE slug = ?");
$check->execute([$slug]);
if ($check->fetch()) {
    $slug .= '-' . time();
}

$publishedAt = ($status === 'published') ? date('Y-m-d H:i:s') : null;

$stmt = $db->prepare("
    INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, status, category, author_id, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->execute([$title, $slug, $content, $excerpt, $featuredImage, $status, $category, $user['user_id'], $publishedAt]);

$id = $db->lastInsertId();

jsonResponse([
    'success' => true,
    'message' => 'Blog post created successfully',
    'data' => [
        'id' => (int)$id,
        'title' => $title,
        'slug' => $slug,
        'status' => ucfirst($status),
        'category' => $category
    ]
], 201);
