-- Admin Panel Database Schema
-- Run this in phpMyAdmin or MySQL CLI

-- CREATE DATABASE IF NOT EXISTS `u891495087_new` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `u891495087_new`;

-- Admin Users table
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
) ENGINE=InnoDB;

-- Insert default admin user (password: admin123)
INSERT INTO `admin_users` (`username`, `password`, `full_name`, `email`, `role`) VALUES
('admin', '$2y$10$7l8Eh8G.B2WKOxu4ikWXZuHkNofwQQqOD7KXv.lP/02ys/59BwFD6', 'Admin User', 'admin@avs.com', 'super_admin');

-- Media Files table
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
) ENGINE=InnoDB;

-- Blog Posts table
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
) ENGINE=InnoDB;

-- Insert sample blog posts
INSERT INTO `blog_posts` (`title`, `slug`, `content`, `status`, `category`, `author_id`, `views`, `published_at`) VALUES
('Top 10 Hidden Gems in Bali', 'top-10-hidden-gems-bali', 'Discover the most beautiful hidden spots in Bali...', 'published', 'Travel Guide', 1, 1240, NOW()),
('Umrah 2026: Complete Preparation Guide', 'umrah-2026-preparation-guide', 'Everything you need to know for Umrah 2026...', 'draft', 'Umrah', 1, 0, NULL),
('European Summer: A 15-Day Itinerary', 'european-summer-itinerary', 'Plan your dream European summer vacation...', 'published', 'Special Tours', 1, 3850, NOW()),
('Luxury Stays in the Heart of Dubai', 'luxury-stays-dubai', 'The best luxury hotels and resorts in Dubai...', 'scheduled', 'Luxury', 1, 0, NULL);

-- Inquiries table (from contact/enquiry form)
CREATE TABLE IF NOT EXISTS `inquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30),
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    `replied_at` DATETIME DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Sessions table for token-based auth
CREATE TABLE IF NOT EXISTS `admin_sessions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `token` VARCHAR(255) NOT NULL UNIQUE,
    `expires_at` DATETIME NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
