<?php
/**
 * Public Blog List Endpoint
 * GET /api/blogs/public_list.php
 * Query: ?search=term
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$db = getDB();

$search = $_GET['search'] ?? '';

$sql = "SELECT b.*, u.full_name as author_name FROM blog_posts b LEFT JOIN admin_users u ON b.author_id = u.id WHERE b.status = 'published'";
$params = [];

if (!empty($search)) {
    $sql .= " AND (b.title LIKE ? OR b.category LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$sql .= " ORDER BY COALESCE(b.published_at, b.updated_at) DESC";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$blogs = $stmt->fetchAll();

$formatted = array_map(function($blog) {
    return [
        'id' => (int)$blog['id'],
        'title' => $blog['title'],
        'slug' => $blog['slug'],
        'content' => $blog['content'],
        'excerpt' => $blog['excerpt'],
        'status' => ucfirst($blog['status']),
        'category' => $blog['category'],
        'author' => $blog['author_name'] ?? 'Unknown',
        'views' => number_format($blog['views']),
        'featured_image' => $blog['featured_image'],
        'date' => date('M d, Y', strtotime($blog['updated_at'])),
        'published_at' => $blog['published_at'] ? date('M d, Y', strtotime($blog['published_at'])) : null,
        'created_at' => date('M d, Y', strtotime($blog['created_at']))
    ];
}, $blogs);

jsonResponse([
    'success' => true, 
    'data' => $formatted, 
    'total' => count($formatted)
]);
