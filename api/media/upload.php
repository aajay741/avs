<?php
/**
 * Media Upload Endpoint
 * POST /api/media/upload.php (multipart/form-data)
 * Headers: Authorization: Bearer <token>
 * Body: files[] (file array), tag (optional)
 */
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

$user = authenticateRequest();
$db = getDB();

if (empty($_FILES['files'])) {
    jsonResponse(['success' => false, 'error' => 'No files uploaded'], 400);
}

$tag = $_POST['tag'] ?? 'Uncategorized';
$uploaded = [];
$errors = [];

$allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'video/mp4', 'video/webm', 'video/quicktime',
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

$maxSize = 50 * 1024 * 1024; // 50MB

// Handle both single and multiple file uploads
$files = [];
if (is_array($_FILES['files']['name'])) {
    $count = count($_FILES['files']['name']);
    for ($i = 0; $i < $count; $i++) {
        $files[] = [
            'name' => $_FILES['files']['name'][$i],
            'type' => $_FILES['files']['type'][$i],
            'tmp_name' => $_FILES['files']['tmp_name'][$i],
            'error' => $_FILES['files']['error'][$i],
            'size' => $_FILES['files']['size'][$i]
        ];
    }
} else {
    $files[] = $_FILES['files'];
}

foreach ($files as $file) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors[] = "Failed to upload {$file['name']}";
        continue;
    }

    if (!in_array($file['type'], $allowedTypes)) {
        $errors[] = "File type not allowed: {$file['name']}";
        continue;
    }

    if ($file['size'] > $maxSize) {
        $errors[] = "File too large: {$file['name']}";
        continue;
    }

    // Determine file type category
    if (str_starts_with($file['type'], 'image/')) {
        $fileType = 'image';
    } elseif (str_starts_with($file['type'], 'video/')) {
        $fileType = 'video';
    } else {
        $fileType = 'document';
    }

    $safeName = sanitizeFilename($file['name']);
    $destination = UPLOAD_DIR . $safeName;

    if (move_uploaded_file($file['tmp_name'], $destination)) {
        $stmt = $db->prepare("
            INSERT INTO media_files (file_name, original_name, file_type, mime_type, file_size, file_path, tag, uploaded_by)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $safeName,
            $file['name'],
            $fileType,
            $file['type'],
            $file['size'],
            UPLOAD_URL . $safeName,
            $tag,
            $user['user_id']
        ]);

        $uploaded[] = [
            'id' => (int)$db->lastInsertId(),
            'type' => $fileType,
            'url' => UPLOAD_URL . $safeName,
            'name' => $file['name'],
            'size' => formatFileSize($file['size']),
            'date' => date('M d, Y'),
            'tag' => $tag
        ];
    } else {
        $errors[] = "Failed to save: {$file['name']}";
    }
}

jsonResponse([
    'success' => true,
    'uploaded' => $uploaded,
    'errors' => $errors,
    'total_uploaded' => count($uploaded)
]);
