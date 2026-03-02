<?php
/**
 * Blog List Endpoint
 * GET /api/blogs/list.php
 * Headers: Authorization: Bearer <token>
 * Query: ?status=all|published|draft|scheduled&search=term
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$status = $_GET['status'] ?? 'all';
$search = $_GET['search'] ?? '';

$sql = "SELECT b.*, u.full_name as author_name FROM blog_posts b LEFT JOIN admin_users u ON b.author_id = u.id WHERE 1=1";
$params = [];

if ($status !== 'all') {
    $sql .= " AND b.status = ?";
    $params[] = $status;
}

if (!empty($search)) {
    $sql .= " AND (b.title LIKE ? OR b.category LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

$sql .= " ORDER BY b.updated_at DESC";

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
        'author_id' => (int)$blog['author_id'],
        'views' => number_format($blog['views']),
        'featured_image' => $blog['featured_image'],
        'date' => date('M d, Y', strtotime($blog['updated_at'])),
        'published_at' => $blog['published_at'] ? date('M d, Y', strtotime($blog['published_at'])) : null,
        'created_at' => date('M d, Y', strtotime($blog['created_at']))
    ];
}, $blogs);

// Get stats
$stats = [
    'total' => $db->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn(),
    'published' => $db->query("SELECT COUNT(*) FROM blog_posts WHERE status='published'")->fetchColumn(),
    'drafts' => $db->query("SELECT COUNT(*) FROM blog_posts WHERE status='draft'")->fetchColumn(),
    'avg_views' => $db->query("SELECT COALESCE(AVG(views), 0) FROM blog_posts WHERE status='published'")->fetchColumn()
];

$stats['avg_views'] = $stats['avg_views'] >= 1000 
    ? number_format($stats['avg_views'] / 1000, 1) . 'k' 
    : number_format($stats['avg_views']);

jsonResponse([
    'success' => true, 
    'data' => $formatted, 
    'stats' => $stats,
    'total' => count($formatted)
]);
