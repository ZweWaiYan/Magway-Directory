-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: magway_directory
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'Foods'),(3,'Hotels'),(1,'Pagodas'),(2,'Restaurants');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_post` (`user_id`,`post_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_post_id` (`post_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `places_and_foods` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (14,1,4,'2025-01-22 19:16:06'),(17,3,7,'2025-01-22 19:22:04'),(19,3,8,'2025-01-22 20:01:48'),(20,1,14,'2025-01-22 21:11:47'),(21,1,8,'2025-01-22 21:12:23'),(36,1,39,'2025-01-23 17:34:26'),(37,1,41,'2025-01-23 17:45:52');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `image_size` int unsigned DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive','pending') DEFAULT 'active',
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (13,1,'megamind ','/uploads/c05cd024528827eeb94692b94b327131-image-1735220366493.jpg',13688,'','active','2024-12-26 13:39:26',NULL),(14,3,'minion','/uploads/f013dacbb72e9b8a5f5e37771f76e527-image-1735220423476.jpg',11629,'','active','2024-12-26 13:40:23',NULL),(18,1,'minions','/uploads/9d5d6cf2b33b71e9557979405f956baf-image-1735313504125.jpg',14697,'','active','2024-12-27 15:31:44',NULL),(19,1,'bamboo pagoda','/uploads/c64e1d9f213b2748f1d90155c04e4afd-image-1736149368622.jpg',60104,'','active','2025-01-06 07:42:48',NULL),(20,1,'bamboo pagoda','/uploads/713b9f50ca66f1c0b77dc86e72333ef2-image-1736149443105.jpg',60104,'','active','2025-01-06 07:44:03',NULL),(21,1,'bamboo pagoda','/uploads/d7d0a8c4387d1c18ecf4aed072beeb87-image-1736149475335.jpg',60104,'','active','2025-01-06 07:44:35',NULL),(22,1,'bamboo pagoda','/uploads/517c771757b2b205e168dba76ab87e4d-image-1736149534329.jpg',60104,'','active','2025-01-06 07:45:34',NULL),(23,1,'bamboo pagoda','/uploads/5690e079cf5ee9fd955782576a1bf2be-image-1736149560221.jpg',60104,'','active','2025-01-06 07:46:00',NULL),(24,1,'aaaaa','/uploads/8ee218fca2d20c6119725ad9e5af2d2b-image-1736149609773.jpg',60104,'','active','2025-01-06 07:46:49',NULL),(25,1,'aaaaa','/uploads/1c719494a9f813a3b85589e59cabc751-image-1736149644988.jpg',60104,'','active','2025-01-06 07:47:25',NULL),(26,1,'aaaaa','/uploads/094d6ae836bd8d048e4cadb9ace8c0ac-image-1736149645283.jpg',60104,'','active','2025-01-06 07:47:25',NULL),(27,1,'aaaaa','/uploads/c0bd53d773db5f7eed79f96c08b42bfe-image-1736149645622.jpg',60104,'','active','2025-01-06 07:47:25',NULL),(28,1,'aaaaa','/uploads/8c9099b43369e4a8035ca3f5cbb27235-image-1736149645777.jpg',60104,'','active','2025-01-06 07:47:25',NULL),(29,1,'aaaa','/uploads/b422f4b80ea225109b81fa6ba7defc56-image-1736149682992.jpg',60104,'','active','2025-01-06 07:48:03',NULL);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places_and_foods`
--

DROP TABLE IF EXISTS `places_and_foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places_and_foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `average_rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `total_votes` int NOT NULL DEFAULT '0',
  `link` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `view_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `idx_category_rating` (`category_id`,`average_rating` DESC),
  CONSTRAINT `places_and_foods_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places_and_foods`
--

LOCK TABLES `places_and_foods` WRITE;
/*!40000 ALTER TABLE `places_and_foods` DISABLE KEYS */;
INSERT INTO `places_and_foods` VALUES (1,'pagoda1',1,'/images/pagodas/p1.jpg','pagoda1',NULL,2.67,3,NULL,'2025-01-13 15:37:22',51),(3,'MYATHALUN PAGODA',1,'/images/pagodas/p3.jpg','MYATHALUN PAGODA','LOCATION TEST',5.00,5,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27115.417087839578!2d94.90949659925852!3d20.1574429482218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d220fcea3621%3A0xf7cf888276d69a8f!2sMyathalun%20Pagoda!5e1!3m2!1sen!2smm!4v1736160098764!5m2!1sen!2smm','2025-01-13 00:00:00',77),(4,'pagoda4',1,'/images/pagodas/p4.jpg','pagoda4','Magway',4.50,4,NULL,'2025-01-13 15:37:22',59),(5,'pagoda5',1,'/images/pagodas/p5.jpg','pagoda5','Magway',0.00,0,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59918.877200225266!2d94.92477143173946!3d20.178647148642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d220fcea3621%3A0xf7cf888276d69a8f!2sMyathalun%20Pagoda!5e0!3m2!1sen!2smm!4v1737211988171!5m2!1sen!2smm','2025-01-13 00:00:00',14),(7,'food2',4,'/images/foods/f2.jpg','food2',NULL,4.00,2,NULL,'2025-01-13 15:37:22',24),(8,'food3',4,'/images/foods/f3.jpg','food3',NULL,4.00,3,NULL,'2025-01-13 15:37:22',45),(10,'food5',4,'/images/foods/f5.jpg','food5',NULL,4.50,2,NULL,'2025-01-13 15:37:22',11),(11,'hotel1',3,'/images/hotels/h1.jpg','hotel1',NULL,4.00,1,NULL,'2025-01-13 15:37:22',15),(13,'hotel3',3,'/images/hotels/h3.jpg','hotel3',NULL,0.00,0,NULL,'2025-01-13 15:37:22',14),(14,'hotel4',3,'/images/hotels/h4.jpg','hotel4',NULL,3.00,2,NULL,'2025-01-13 15:37:22',24),(15,'hotel5',3,'/images/hotels/h5.jpg','hotel5',NULL,0.00,0,NULL,'2025-01-13 15:37:22',12),(17,'pagoda6',1,'/images/pagodas/p6.jpg','pagoda6',NULL,0.00,0,NULL,'2025-01-13 15:37:22',13),(38,'BAMBOO PAGODA',1,'/images/pagodas/475b5244-8842-4452-bd5e-1740c5117c01.jpg','BAMBOO PAGODA IN MAGWAY','MAGWAY',2.00,1,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10592.721877457692!2d94.92084662402847!3d20.171863957602376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d2268294c961%3A0x38de6c9c7d8e729f!2sBamboo%20Pagoda!5e0!3m2!1sen!2smm!4v1736172170563!5m2!1sen!2smm','2025-01-13 00:00:00',16),(39,'PANN YIT TAUNG PAGODA',1,'/images/pagodas/4c7983fe-41b6-4f8e-bc2d-ffd7294971d6.jpg','PANN YIT TAUNG PAGODA','MAGWAY',3.00,1,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6778.470397703749!2d94.92028562715899!3d20.166279790980603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d12dc2880b3d%3A0x8bcc409a8181d61a!2sPann%20Yit%20Taung%20Pagoda!5e1!3m2!1sen!2smm!4v1736161017496!5m2!1sen!2smm','2025-01-13 15:37:22',28),(41,'gang gaw 1000',1,'/images/pagodas/a3179a85-041f-41f9-8bfb-edb272212b85.jpg','upload test','Magway',3.00,1,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59928.98919540949!2d94.93217279999999!3d20.15232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d229390e3e69%3A0x8cfdae7b323c15b2!2sGantgaw%20Tahtaung%20Pagoda!5e0!3m2!1sen!2smm!4v1736258742553!5m2!1sen!2smm','2025-01-13 15:37:22',17),(49,'MONT YE',4,'/images/Foods/4cfef51a-051c-40bd-9b52-f55361ddbb02.jpg','mont ye. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Magway',3.00,1,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6299.647689495232!2d94.93625677297763!3d20.142684753284094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d163b4cfecfd%3A0x7a3ea480cd67b36!2sKan%20Thar%20Lake%20Park!5e0!3m2!1sen!2smm!4v1737213665653!5m2!1sen!2smm','2025-01-18 00:00:00',17),(81,'Fruits',4,'/images/Foods/bbc22017-2575-4608-ae9f-fe33fe9b7aee.jpg','Fruits and vegetables are blah blah blah','Magway',4.00,1,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.772645830001!2d94.92468521257545!3d20.143530510876413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d168126a8bb7%3A0xcba907632381409b!2zU2VsZWN0aW9uIDIgKOGAnOGAgOGAuuGAm-GAveGAseGAuOGAheGAhOGAuiDhgYIp!5e0!3m2!1sen!2smm!4v1737233236165!5m2!1sen!2smm','2025-01-19 00:00:00',20),(86,'Food1',4,'/images/Foods/af8fe4ec-e429-409d-b4be-f8ed31eced9c.jpg','Food1','Magway',0.00,0,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7489.205751763044!2d94.97045129065754!3d20.192253925023486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d38a61e9ce6d%3A0x42fca9eb370d5fcc!2sNatkan!5e0!3m2!1sen!2smm!4v1737651523184!5m2!1sen!2smm','2025-01-23 16:58:56',4),(87,'Pagoda2',1,'/images/Pagodas/b55e6791-a443-4df1-9f70-2244bfd001c7.jpg','Pagoda1','Magway',0.00,0,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.772645830001!2d94.92468521257545!3d20.143530510876413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d168126a8bb7%3A0xcba907632381409b!2zU2VsZWN0aW9uIDIgKOGAnOGAgOGAuuGAm-GAveGAseGAuOGAheGAhOGAuiDhgYIp!5e0!3m2!1sen!2smm!4v1737233236165!5m2!1sen!2smm','2025-01-23 17:00:24',6),(88,'Food',4,'/images/Foods/928cd0d9-7259-43b9-9162-da51db2dab8c.jpg','food','Magway',0.00,0,'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7491.1015142416945!2d94.92689809065308!3d20.15278132514506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30b7d1fa2bba6a8f%3A0xe9ab9995ff89b06c!2z4YCZ4YCx4YCs4YC64YCc4YCZ4YC84YCt4YCv4YCE4YC6IOGAmeGAvOGAlOGAuuGAmeGArCDhgJHhgJnhgIThgLrhgLjhgIbhgK3hgK_hgIThgLo!5e0!3m2!1sen!2smm!4v1737654567922!5m2!1sen!2smm','2025-01-23 00:00:00',3);
/*!40000 ALTER TABLE `places_and_foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `place_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `review` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `place_id` (`place_id`,`user_id`),
  KEY `idx_place_id` (`place_id`),
  KEY `ratings_user_fk` (`user_id`),
  CONSTRAINT `ratings_ib_fk_1` FOREIGN KEY (`place_id`) REFERENCES `places_and_foods` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (3,8,3,5,'good','2024-12-21 12:36:17','2024-12-21 12:36:17'),(4,3,1,5,'test','2024-12-23 09:09:28','2024-12-23 09:09:28'),(5,4,1,5,'test','2024-12-23 09:09:51','2024-12-23 09:09:51'),(6,8,1,3,'5','2024-12-23 16:06:11','2024-12-23 16:06:11'),(7,7,1,4,'aaaa','2024-12-23 16:08:03','2024-12-23 16:08:03'),(10,4,3,5,'test2','2024-12-25 17:20:52','2024-12-25 17:20:52'),(11,10,1,5,'good','2024-12-26 15:06:52','2024-12-26 15:06:52'),(12,10,3,4,'nice','2024-12-27 13:27:45','2024-12-27 13:27:45'),(13,1,1,5,'adsf','2024-12-27 15:31:00','2024-12-27 15:31:00'),(14,3,3,5,'test','2025-01-01 13:23:59','2025-01-01 13:23:59'),(16,3,4,5,'test','2025-01-01 13:38:40','2025-01-01 13:38:40'),(29,1,4,2,'qwer','2025-01-01 19:34:43','2025-01-01 19:34:43'),(30,7,3,4,'good','2025-01-02 10:02:24','2025-01-02 10:02:24'),(32,14,5,3,'test','2025-01-02 14:19:13','2025-01-02 14:19:13'),(36,4,5,3,'test','2025-01-04 20:07:09','2025-01-04 20:07:09'),(38,11,4,4,'test','2025-01-05 11:11:05','2025-01-05 11:11:05'),(39,39,1,3,'test','2025-01-06 14:10:44','2025-01-06 14:10:44'),(41,41,1,3,'test','2025-01-07 14:06:49','2025-01-07 14:06:49'),(43,49,1,3,'test','2025-01-14 10:09:24','2025-01-14 10:09:24'),(45,14,1,3,'test','2025-01-19 08:46:54','2025-01-19 08:46:54'),(47,8,78,4,'for test purpose','2025-01-20 09:52:25','2025-01-20 09:52:25'),(48,81,1,4,'good, good for health.','2025-01-22 09:33:27','2025-01-22 09:33:27'),(50,38,1,2,'test','2025-01-23 17:20:33','2025-01-23 17:20:33');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT 'no name',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `region` varchar(255) DEFAULT NULL,
  `age` varchar(25) NOT NULL DEFAULT 'over_18',
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('User','Admin','Editor') NOT NULL DEFAULT 'User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'Alexa','alexa@gmail.com','$2a$10$nZDWNq0pSYa.KQ50l9AOdeXHzvXgVTg04Dg8Ug9/jtMK1UYzWAzAq','east','over_18','2025-01-20 14:14:31','Admin'),(1,'test','test@gmail.com','$2a$10$e5aZyOYXc.F8iNHl2Iu7yOrfJSduo0g3D.cgTIxdONBmNLlNEbW7K','magway','22','2025-01-20 14:14:31','Editor'),(2,'bikes','bikes@gmail.com','$2a$10$ur5Hrz1PtTSBjEo7Fgm3werrMsC1C7MSmQ19to8iTC6S9bKV88Wtm','magway','22','2025-01-20 14:14:31','User'),(3,'mgmg','mgmg@gmail.com','$2a$10$ZYJPZQ0ey1F2NdH4jEemBOaReJ17K5/5gCc8vNwf1yFKWe/QtkmEe','Magway','23','2025-01-20 14:14:31','User'),(4,'AungAung','aungaung@gmail.com','$2a$10$AOWaxV8CHRFD2Xd8AOU4puBgASr3B7jf2ITequEVmpzwrQP9a.teC','Magway','23','2025-01-20 14:14:31','User'),(5,'bears','bears@gmail.com','$2a$10$KecUSjK6zvRbR3DaI2luouMlqbaWTUeq2Ay034iY1Pqa3yq6Xw3iK','Magway','23','2025-01-20 14:14:31','User'),(7,'Clouds','clouds@gmail.com','$2a$10$IAvaRiCF5Fgp74mwDrUSRuROfRH6WhmT6P9p0u6Zxil.68f.OQYZO','home','23','2025-01-21 14:14:31','User'),(37,'Kratos','kratos@gmail.com','$2a$10$zEqXornr32NuVZAlaxYEQO3C8wO4PyKmN8D0qaHjk/PQ2oJiZlexO','south','over_18','2025-01-21 14:14:31','User'),(38,'annie','annie@gmail.com','$2a$10$xZX.hogpnGnD0ePZyquT9OAp/EOGECmd5/V7es1tse.NSogN/lGGq','south','over_18','2025-01-21 14:14:31','Admin'),(78,'kyawkyaw','kyawkyaw@gmail.com','$2a$10$Xs5n5E6ZDFsIgaRlNPKcduGQ7JjQAd0I.fN/AG6RyARpt388ztQK.',NULL,'over_18','2025-01-22 14:14:31','User'),(82,'zawzaw','zawzaw@gmail.com','$2a$10$eiWzQWtv3iLCaR2JemO8..BSg5I19o4t3GlHGhwT2JEb2OP94tL0G',NULL,'over_18','2025-01-22 14:14:31','User'),(83,'lina','lina@gmail.com','$2a$10$Yy1kIeij3J3WVQVy2qhs3.taLU/etp3rwZbUjUX4j8ipmG/QsL8p.',NULL,'over_18','2025-01-22 19:20:01','User'),(84,'magnus','magnus@gmail.com','$2a$10$Nd9LFtWMIz8CGBB9sCcfBO3AzWpRzqZh0MKoRdA.Yo7RY1AubJKR2',NULL,'over_18','2025-01-19 09:11:28','User'),(85,'hikaru','hikaru@gmail.com','$2a$10$xahjqdziLaK4Z6PF3jdoOuofFf7Zu2hqNVB1x5z84aLeyf.MZF/Iu',NULL,'over_18','2025-01-19 09:11:28','User'),(87,'jerax ai','jerax@gmail.com','$2a$10$Q1Cn/RFnE/2FoyUoR/j6Cez5nGt7cZXlewtZ1ThsAyiM14opgAvfe',NULL,'over_18','2025-01-23 12:53:12','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-24  0:25:45
