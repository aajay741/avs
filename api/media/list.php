<?php
/**
 * Media List Endpoint
 * GET /api/media/list.php
 * Headers: Authorization: Bearer <token>
 * Query: ?filter=all|images|videos|documents&search=term
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$filter = $_GET['filter'] ?? 'all';
$search = $_GET['search'] ?? '';

$sql = "SELECT m.*, u.full_name as uploaded_by_name FROM media_files m LEFT JOIN admin_users u ON m.uploaded_by = u.id WHERE 1=1";
$params = [];

if ($filter !== 'all') {
    $typeMap = ['images' => 'image', 'videos' => 'video', 'documents' => 'document'];
    if (isset($typeMap[$filter])) {
        $sql .= " AND m.file_type = ?";
        $params[] = $typeMap[$filter];
    }
}

if (!empty($search)) {
    $sql .= " AND m.original_name LIKE ?";
    $params[] = "%$search%";
}

$sql .= " ORDER BY m.created_at DESC";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$items = $stmt->fetchAll();

// Format the response
$formatted = array_map(function($item) {
    return [
        'id' => (int)$item['id'],
        'type' => $item['file_type'],
        'url' => $item['file_path'],
        'name' => $item['original_name'],
        'size' => formatFileSize($item['file_size']),
        'date' => date('M d, Y', strtotime($item['created_at'])),
        'tag' => $item['tag'],
        'uploadedBy' => $item['uploaded_by_name'] ?? 'Unknown'
    ];
}, $items);

jsonResponse(['success' => true, 'data' => $formatted, 'total' => count($formatted)]);
