<?php
/**
 * Setup Script - Run this once to initialize the database and create the admin user
 * Access via: http://your-domain.com/api/setup.php
 */

header('Content-Type: text/html; charset=utf-8');

// Include config to get database credentials
require_once __DIR__ . '/config.php';

$host = DB_HOST;
$user = DB_USER;
$pass = DB_PASS;
$dbname = DB_NAME;

echo "<h1>Admin Panel - Database Setup</h1>";

try {
    // Connect without database first
    $pdo = new PDO("mysql:host=$host", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "<p style='color: green;'>✅ Database '$dbname' created or already exists.</p>";

    // Select database
    $pdo->exec("USE `$dbname`");

    // Create admin_users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admin_users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(50) NOT NULL UNIQUE,
            `password` VARCHAR(255) NOT NULL,
            `full_name` VARCHAR(100) NOT NULL,
            `email` VARCHAR(100),
            `role` ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
            `avatar` VARCHAR(255) DEFAULT NULL,
            `last_login` DATETIME DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB
    ");
    echo "<p style='color: green;'>✅ Table 'admin_users' created.</p>";

    // Create media_files table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `media_files` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `file_name` VARCHAR(255) NOT NULL,
            `original_name` VARCHAR(255) NOT NULL,
            `file_type` ENUM('image', 'video', 'document') NOT NULL,
            `mime_type` VARCHAR(100) NOT NULL,
            `file_size` BIGINT NOT NULL,
            `file_path` VARCHAR(500) NOT NULL,
            `tag` VARCHAR(100) DEFAULT 'Uncategorized',
            `uploaded_by` INT,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`uploaded_by`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
        ) ENGINE=InnoDB
    ");
    echo "<p style='color: green;'>✅ Table 'media_files' created.</p>";

    // Create blog_posts table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `blog_posts` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(500) NOT NULL,
            `slug` VARCHAR(500),
            `content` LONGTEXT,
            `excerpt` TEXT,
            `featured_image` VARCHAR(500),
            `status` ENUM('published', 'draft', 'scheduled') DEFAULT 'draft',
            `category` VARCHAR(100) DEFAULT 'General',
            `author_id` INT,
            `views` INT DEFAULT 0,
            `scheduled_at` DATETIME DEFAULT NULL,
            `published_at` DATETIME DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (`author_id`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
        ) ENGINE=InnoDB
    ");
    echo "<p style='color: green;'>✅ Table 'blog_posts' created.</p>";

    // Create inquiries table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `inquiries` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `full_name` VARCHAR(150) NOT NULL,
            `email` VARCHAR(150) NOT NULL,
            `phone` VARCHAR(30),
            `message` TEXT NOT NULL,
            `status` ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
            `replied_at` DATETIME DEFAULT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB
    ");
    echo "<p style='color: green;'>✅ Table 'inquiries' created.</p>";

    // Create admin_sessions table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admin_sessions` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `user_id` INT NOT NULL,
            `token` VARCHAR(255) NOT NULL UNIQUE,
            `expires_at` DATETIME NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB
    ");
    echo "<p style='color: green;'>✅ Table 'admin_sessions' created.</p>";

    // Check if admin user exists
    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE username = 'admin'");
    $stmt->execute();
    
    if (!$stmt->fetch()) {
        // Create admin user with properly hashed password
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO admin_users (username, password, full_name, email, role) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(['admin', $hashedPassword, 'Admin User', 'admin@avs.com', 'super_admin']);
        echo "<p style='color: green;'>✅ Default admin user created.</p>";
        echo "<p><strong>Username:</strong> admin</p>";
        echo "<p><strong>Password:</strong> admin123</p>";
    } else {
        echo "<p style='color: blue;'>ℹ️ Admin user already exists.</p>";
    }

    // Insert sample blog posts if none exist
    $count = $pdo->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();
    if ($count == 0) {
        $stmt = $pdo->prepare("INSERT INTO blog_posts (title, slug, content, status, category, author_id, views, published_at) VALUES (?, ?, ?, ?, ?, 1, ?, ?)");
        $stmt->execute(['Top 10 Hidden Gems in Bali', 'top-10-hidden-gems-bali', 'Discover the most beautiful hidden spots in Bali...', 'published', 'Travel Guide', 1240, date('Y-m-d H:i:s')]);
        $stmt->execute(['Umrah 2026: Complete Preparation Guide', 'umrah-2026-preparation-guide', 'Everything you need to know for Umrah 2026...', 'draft', 'Umrah', 0, null]);
        $stmt->execute(['European Summer: A 15-Day Itinerary', 'european-summer-itinerary', 'Plan your dream European summer vacation...', 'published', 'Special Tours', 3850, date('Y-m-d H:i:s')]);
        $stmt->execute(['Luxury Stays in the Heart of Dubai', 'luxury-stays-dubai', 'The best luxury hotels and resorts in Dubai...', 'scheduled', 'Luxury', 0, null]);
        echo "<p style='color: green;'>✅ Sample blog posts created.</p>";
    }

    // Create uploads directory
    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
        echo "<p style='color: green;'>✅ Uploads directory created.</p>";
    }

    echo "<hr>";
    echo "<h2 style='color: green;'>🎉 Setup Complete!</h2>";
    echo "<p>Your admin panel is ready. Go to <a href='http://localhost:5173/admin/login'>Admin Login</a></p>";

} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Error: " . $e->getMessage() . "</p>";
    echo "<p>Make sure XAMPP MySQL is running!</p>";
}
