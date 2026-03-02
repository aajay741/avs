<?php
/**
 * Dashboard Stats Endpoint
 * GET /api/dashboard/stats.php
 * Headers: Authorization: Bearer <token>
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

// Gather all stats
$totalMedia = $db->query("SELECT COUNT(*) FROM media_files")->fetchColumn();
$totalBlogs = $db->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();
$publishedBlogs = $db->query("SELECT COUNT(*) FROM blog_posts WHERE status='published'")->fetchColumn();
$totalInquiries = $db->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();
$newInquiries = $db->query("SELECT COUNT(*) FROM inquiries WHERE status='new'")->fetchColumn();
$totalViews = $db->query("SELECT COALESCE(SUM(views), 0) FROM blog_posts")->fetchColumn();

// Recent inquiries
$recentInquiries = $db->query("
    SELECT full_name, email, message, status, created_at 
    FROM inquiries 
    ORDER BY created_at DESC 
    LIMIT 5
")->fetchAll();

// Recent blog posts
$recentBlogs = $db->query("
    SELECT b.title, b.status, b.views, b.updated_at, u.full_name as author 
    FROM blog_posts b 
    LEFT JOIN admin_users u ON b.author_id = u.id 
    ORDER BY b.updated_at DESC 
    LIMIT 5
")->fetchAll();

// Format recent inquiries
$formattedInquiries = array_map(function($inq) {
    return [
        'name' => $inq['full_name'],
        'email' => $inq['email'],
        'message' => substr($inq['message'], 0, 100) . (strlen($inq['message']) > 100 ? '...' : ''),
        'status' => $inq['status'],
        'date' => date('M d, Y', strtotime($inq['created_at']))
    ];
}, $recentInquiries);

// Format recent blogs
$formattedBlogs = array_map(function($blog) {
    return [
        'title' => $blog['title'],
        'status' => ucfirst($blog['status']),
        'views' => number_format($blog['views']),
        'author' => $blog['author'],
        'date' => date('M d, Y', strtotime($blog['updated_at']))
    ];
}, $recentBlogs);

jsonResponse([
    'success' => true,
    'stats' => [
        'total_media' => (int)$totalMedia,
        'total_blogs' => (int)$totalBlogs,
        'published_blogs' => (int)$publishedBlogs,
        'total_inquiries' => (int)$totalInquiries,
        'new_inquiries' => (int)$newInquiries,
        'total_views' => number_format($totalViews)
    ],
    'recent_inquiries' => $formattedInquiries,
    'recent_blogs' => $formattedBlogs
]);
