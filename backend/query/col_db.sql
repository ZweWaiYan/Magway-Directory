CREATE DATABASE `magway_directory`;

USE magway_directory;

CREATE TABLE `users` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `username` VARCHAR(255) NOT NULL DEFAULT 'no name',
    `password` VARCHAR(255) NOT NULL,
    `age` VARCHAR(25) NOT NULL DEFAULT 'over_18',
    `region` VARCHAR(255),
    `creation_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `role` ENUM('User', 'Admin', 'Editor') NOT NULL DEFAULT 'User'
);

CREATE TABLE `categories` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    INDEX `idx_name` (`name`)
);

CREATE TABLE `places_and_foods` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `user_id` INT NOT NULL, 
    `category_id` INT NOT NULL,
    `image_path` VARCHAR(255),
    `description` TEXT,
    `location` VARCHAR(255),
    `average_rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    `total_votes` INT NOT NULL DEFAULT 0,
    `link` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `view_count` INT NOT NULL DEFAULT 0
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE,
    INDEX `category_id` (`category_id`),
    INDEX `idx_category_rating` (`category_id`, `average_rating`)
);

CREATE TABLE `ratings` (
    `id` int AUTO_INCREMENT PRIMARY KEY,
    `place_id` int NOT NULL,
    `user_id` int NOT NULL,
    `rating` int NOT NULL,
    `review` TEXT,
    UNIQUE(`place_id`, `user_id`),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`place_id`) REFERENCES `places_and_foods`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL UNIQUE,
    `image_size` INT UNSIGNED,
    `tags` VARCHAR(255),
    `status` ENUM('active', 'inactive', 'pending') DEFAULT 'active',
    `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE `favorites` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_user_post` (`user_id`, `post_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `places_and_foods`(`id`) ON DELETE CASCADE
);
