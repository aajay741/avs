<?php
/**
 * Inquiries List Endpoint
 * GET /api/inquiries/list.php
 * Headers: Authorization: Bearer <token>
 * Query: ?status=all|new|read|replied|archived
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

$status = $_GET['status'] ?? 'all';

$sql = "SELECT * FROM inquiries WHERE 1=1";
$params = [];

if ($status !== 'all') {
    $sql .= " AND status = ?";
    $params[] = $status;
}

$sql .= " ORDER BY created_at DESC";

$stmt = $db->prepare($sql);
$stmt->execute($params);
$inquiries = $stmt->fetchAll();

$formatted = array_map(function($inq) {
    return [
        'id' => (int)$inq['id'],
        'full_name' => $inq['full_name'],
        'email' => $inq['email'],
        'phone' => $inq['phone'],
        'message' => $inq['message'],
        'status' => $inq['status'],
        'date' => date('M d, Y h:i A', strtotime($inq['created_at'])),
        'replied_at' => $inq['replied_at'] ? date('M d, Y', strtotime($inq['replied_at'])) : null
    ];
}, $inquiries);

// Stats
$newCount = $db->query("SELECT COUNT(*) FROM inquiries WHERE status='new'")->fetchColumn();
$totalCount = $db->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();

jsonResponse([
    'success' => true,
    'data' => $formatted,
    'total' => count($formatted),
    'new_count' => (int)$newCount,
    'total_count' => (int)$totalCount
]);
