-- MySQL dump 10.13  Distrib 8.0.41, for macos15.2 (arm64)
--
-- Host: localhost    Database: taptour
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `Activities`
--

DROP TABLE IF EXISTS `Activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `time_duration` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `price` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activities`
--

LOCK TABLES `Activities` WRITE;
/*!40000 ALTER TABLE `Activities` DISABLE KEYS */;
INSERT INTO `Activities` VALUES (1,'匈牙利布達佩斯 | 多瑙河黃昏遊船含飲品','欣賞越夜越美麗的布達佩斯\n一邊欣賞沿途風景，一邊享用飲品\n從遊船頂端的開放甲板，眺望多瑙河沿岸的全景',6,'2024-12-31 16:00:00','2025-12-30 16:00:00',720,1,1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(2,'匈牙利布達佩斯 | 塞切尼溫泉浴場門票','盡情享受溫泉泡湯體驗帶來的療癒\n恣意進出 18 個浴池以及許多三溫暖與蒸氣室\n欣賞浴場富麗堂皇的新巴洛克風格建築',4,'2024-12-31 16:00:00','2025-12-30 16:00:00',1439,1,1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(3,'泰國曼谷 | Jim Thompson 故居博物館導覽','美國企業家詹姆斯·湯普森（James Thompson）的故居,泰式住宅,探索這座房子裡大量的藝術品和古董,以及寧靜的花園。',4,'2024-12-31 16:00:00','2025-12-30 16:00:00',1800,2,3,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(4,'泰國曼谷 | 曼谷一日遊：臥佛寺、鄭王廟、大皇宮、玉佛寺｜包團','乘坐專屬包車參觀城市的地標，探索曼谷的精彩\n立即預訂即可享受獨家優惠\n參觀曼谷的迷人景點，包括大皇宮、臥佛寺和鄭王廟',10,'2024-12-31 16:00:00','2025-12-30 16:00:00',2379,2,3,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(5,'泰國曼谷 | 曼谷野生動物園一日遊｜拼車／包車','在曼谷野生動物園與來自世界各地的數百種動物近距離接觸\n省去通勤的麻煩，享受拼車接送的便利\n如需最自在的體驗，請選擇包車服務，體驗建議行程中所有必看節目',8,'2024-12-31 16:00:00','2025-12-30 16:00:00',1262,2,1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(6,'暢遊曼谷｜昭披耶河觀光遊覽船票券','舒適安全的觀光船，帶你一同欣賞昭披耶河的沿岸風光，只需一張船票可以在時間內不限次數搭乘。',8,'2024-12-31 16:00:00','2025-12-30 16:00:00',117,2,3,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(7,'維也納｜茜茜公主博物館（Sisi Museum）','奧地利首都維也納是歐洲的音樂、藝術和文化中心，擁有豐富的歷史建築與文化遺產。',4,'2024-12-31 16:00:00','2025-12-30 16:00:00',1400,3,3,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(8,'奧地利｜哈修塔特 HALLSTATT 一日遊｜維也納出發','探索探索位於阿爾卑斯山脈，被譽為奧地利最美麗心的村莊之一的哈修塔特。',10,'2024-12-31 16:00:00','2025-12-30 16:00:00',5627,8,1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(9,'捷克庫倫洛夫一日遊 | 庫倫洛夫城堡、聖維塔大教堂和貴族花園','遊覽捷克第二大的城堡群，漫步在這個充滿橘色屋瓦、彩色磚牆的小鎮。',10,'2024-12-31 16:00:00','2025-12-30 16:00:00',4824,4,3,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(10,'捷克庫倫洛夫 | FILM LEGENDS EXPERIENCE MUSEUM','FILM LEGENDS EXPERIENCE MUSEUM - Český Krumlov 是一個沉浸式的電影傳奇體驗博物館。',1,'2024-12-31 16:00:00','2025-12-30 16:00:00',600,4,3,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(11,'馬來西亞沙巴｜10天9晚沙巴自然體驗之旅 & 馬布島','遊覽沙巴仙本那的同時，參加這個跳島遊。在馬布島、馬達京島、卡帕萊群島等熱門景點浮潛！\n\n放鬆身心，欣賞多個島嶼的壯麗景色\n跳入水晶般清澈的海水中浮潛，與一群充滿活力的海洋生物一起游泳\n享受超值的一站式套餐，包括住宿、接送、浮潛和餐飲',240,'2024-12-31 16:00:00','2025-12-30 16:00:00',89500,5,1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(12,'名古屋世界遺產白川鄉＆飛彈高山散步（愛知縣/岐阜縣）','高山古老的街道漫遊\n高山古老的街道是飛驒高山中最受推薦的觀光勝地。無論何時前來，都充滿了觀光客。古老的街道上，水道沿著格子狀的檐下流淌，釀酒廠的招牌，也就是懸掛在出格子下的檜木葉子製成的『酒林（酒ばやし）』，以及町屋的大戶門、老舗的暖簾懸掛在檐下。\n日本的秘境ー飛驒白川鄉\n被列為世界遺產的「合掌造聚落」保留了大小超過100座的合掌造，仍然是人們居住和生活的地方。此外，還有以白山為背景的「平瀬温泉」等源自傳統智慧和技藝，並能體驗壯麗自然的觀光勝地',6,'2024-12-31 16:00:00','2025-12-30 16:00:00',6000,6,1,'2025-02-15 06:30:14','2025-02-15 06:30:14');
/*!40000 ALTER TABLE `Activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'戶外活動','2025-02-15 06:30:14','2025-02-15 06:30:14'),(2,'美食體驗','2025-02-15 06:30:14','2025-02-15 06:30:14'),(3,'文化活動','2025-02-15 06:30:14','2025-02-15 06:30:14'),(4,'冒險運動','2025-02-15 06:30:14','2025-02-15 06:30:14');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `user_id` int DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `item_type` enum('activity','product') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favorites`
--

LOCK TABLES `Favorites` WRITE;
/*!40000 ALTER TABLE `Favorites` DISABLE KEYS */;
INSERT INTO `Favorites` VALUES (1,1,11,'product','2025-02-15 06:32:11','2025-02-15 06:32:11'),(2,1,10,'product','2025-02-15 06:32:12','2025-02-15 06:32:12'),(3,1,1,'activity','2025-02-15 06:32:17','2025-02-15 06:32:17'),(4,1,3,'activity','2025-02-15 06:32:18','2025-02-15 06:32:18');
/*!40000 ALTER TABLE `Favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Followers`
--

DROP TABLE IF EXISTS `Followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `follower_id` (`follower_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Followers`
--

LOCK TABLES `Followers` WRITE;
/*!40000 ALTER TABLE `Followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `Followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Images`
--

DROP TABLE IF EXISTS `Images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Images`
--

LOCK TABLES `Images` WRITE;
/*!40000 ALTER TABLE `Images` DISABLE KEYS */;
INSERT INTO `Images` VALUES (1,'/uploads/activities/xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-1/1-xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-001.png',1,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(2,'/uploads/activities/xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-1/1-xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-002.png',1,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(3,'/uploads/activities/xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-1/1-xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-003.png',1,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(4,'/uploads/activities/xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-1/1-xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-004.png',1,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(5,'/uploads/activities/xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-1/1-xiong-ya-li-bu-da-pei-si--duo-nao-he-huang-hun-you-chuan-han-yin-pin-005.png',1,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(6,'/uploads/activities/xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-2/2-xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-001.png',2,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(7,'/uploads/activities/xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-2/2-xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-002.png',2,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(8,'/uploads/activities/xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-2/2-xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-003.png',2,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(9,'/uploads/activities/xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-2/2-xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-004.png',2,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(10,'/uploads/activities/xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-2/2-xiong-ya-li-bu-da-pei-si--sai-qie-ni-wen-quan-yu-chang-men-piao-005.png',2,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(11,'/uploads/activities/tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-3/3-tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-001.jpg',3,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(12,'/uploads/activities/tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-3/3-tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-002.png',3,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(13,'/uploads/activities/tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-3/3-tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-003.png',3,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(14,'/uploads/activities/tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-3/3-tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-004.png',3,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(15,'/uploads/activities/tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-3/3-tai-guo-man-gu-jimthompson-gu-ju-bo-wu-guan-dao-lan-005.png',3,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(16,'/uploads/activities/tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-4/4-tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-001.png',4,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(17,'/uploads/activities/tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-4/4-tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-002.png',4,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(18,'/uploads/activities/tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-4/4-tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-003.png',4,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(19,'/uploads/activities/tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-4/4-tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-004.png',4,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(20,'/uploads/activities/tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-4/4-tai-guo-man-gu--man-gu-yi-ri-you--wo-fo-si--zheng-wang-miao--da-huang-gong--yu-fo-si--bao-tuan-005.png',4,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(21,'/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-001.png',5,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(22,'/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-002.png',5,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(23,'/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-003.png',5,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(24,'/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-004.png',5,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(25,'/uploads/activities/tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-5/5-tai-guo-man-gu--man-gu-ye-sheng-dong-wu-yuan-yi-ri-you--pin-che--bao-che-005.png',5,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(26,'/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-001.png',6,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(27,'/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-002.png',6,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(28,'/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-003.png',6,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(29,'/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-004.png',6,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(30,'/uploads/activities/chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-6/6-chang-you-man-gu--zhao-pi-ye-he-guan-guang-you-lan-chuan-piao-quan-005.png',6,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(31,'/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-001.png',7,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(32,'/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-002.png',7,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(33,'/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-003.png',7,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(34,'/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-004.png',7,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(35,'/uploads/activities/wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-7/7-wei-ye-na--qian-qian-gong-zhu-bo-wu-guan-sisimuseum-005.png',7,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(36,'/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-8/8-ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-001.png',8,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(37,'/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-8/8-ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-002.png',8,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(38,'/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-8/8-ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-003.png',8,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(39,'/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-8/8-ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-004.png',8,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(40,'/uploads/activities/ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-8/8-ao-di-li--ha-xiu-ta-te-hallstatt-yi-ri-you--wei-ye-na-chu-fa-005.png',8,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(41,'/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-001.png',10,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(42,'/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-002.png',10,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(43,'/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-003.png',10,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(44,'/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-004.png',10,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(45,'/uploads/activities/jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-10/10-jie-ke-ku-lun-luo-fu-filmlegendsexperiencemuseum-005.png',10,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(46,'/uploads/activities/ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--11/11-ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--001.png',11,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(47,'/uploads/activities/ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--11/11-ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--002.png',11,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(48,'/uploads/activities/ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--11/11-ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--003.png',11,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(49,'/uploads/activities/ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--11/11-ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--004.png',11,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(50,'/uploads/activities/ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--11/11-ma-lai-xi-ya-sha-ba-10-tian-9-wan-sha-ba-zi-ran-ti-yan-zhi-lv--ma-bu-dao--005.png',11,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(51,'/uploads/activities/ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--12/12-ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--001.png',12,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(52,'/uploads/activities/ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--12/12-ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--002.png',12,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(53,'/uploads/activities/ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--12/12-ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--003.png',12,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(54,'/uploads/activities/ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--12/12-ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--004.png',12,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(55,'/uploads/activities/ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--12/12-ming-gu-wu-shi-jie-yi-chan-bai-chuan-xiang--fei-dan-gao-shan-san-bu--ai-zhi-xian--qi-fu-xian--005.png',12,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(56,'/uploads/activities/jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao--sheng-wei-ta-da-jiao-tang-he-gui-zu-hua-yuan--bu-la-ge-chu-fa-9/9-jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao001.png',9,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(57,'/uploads/activities/jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao--sheng-wei-ta-da-jiao-tang-he-gui-zu-hua-yuan--bu-la-ge-chu-fa-9/9-jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao002.png',9,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(58,'/uploads/activities/jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao--sheng-wei-ta-da-jiao-tang-he-gui-zu-hua-yuan--bu-la-ge-chu-fa-9/9-jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao003.png',9,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(59,'/uploads/activities/jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao--sheng-wei-ta-da-jiao-tang-he-gui-zu-hua-yuan--bu-la-ge-chu-fa-9/9-jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao004.png',9,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(60,'/uploads/activities/jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao--sheng-wei-ta-da-jiao-tang-he-gui-zu-hua-yuan--bu-la-ge-chu-fa-9/9-jie-ke-ku-lun-luo-fu-yi-ri-you--ku-lun-luo-fu-cheng-bao005.png',9,NULL,NULL,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(61,'/uploads/locations/ai-fei-er-tie-ta/1-ai-fei-er-tie-ta-1.jpg',NULL,15,NULL,'2025-01-31 18:56:16','2025-01-31 18:56:16'),(62,'/uploads/locations/ai-fei-er-tie-ta/1-ai-fei-er-tie-ta-2.jpg',NULL,15,NULL,'2025-01-31 18:56:17','2025-01-31 18:56:17'),(63,'/uploads/locations/ai-fei-er-tie-ta/1-ai-fei-er-tie-ta-3.jpg',NULL,15,NULL,'2025-01-31 18:56:18','2025-01-31 18:56:18'),(64,'/uploads/locations/ai-fei-er-tie-ta/1-ai-fei-er-tie-ta-4.jpg',NULL,15,NULL,'2025-01-31 18:56:19','2025-01-31 18:56:19'),(65,'/uploads/locations/ai-fei-er-tie-ta/1-ai-fei-er-tie-ta-5.jpg',NULL,15,NULL,'2025-01-31 18:56:20','2025-01-31 18:56:20'),(66,'/uploads/locations/zi-you-nv-shen-xiang/2-zi-you-nv-shen-xiang-1.jpg',NULL,12,NULL,'2025-01-31 18:59:51','2025-01-31 18:59:51'),(67,'/uploads/locations/zi-you-nv-shen-xiang/2-zi-you-nv-shen-xiang-2.jpg',NULL,12,NULL,'2025-01-31 18:59:54','2025-01-31 18:59:54'),(68,'/uploads/locations/zi-you-nv-shen-xiang/2-zi-you-nv-shen-xiang-3.jpg',NULL,12,NULL,'2025-01-31 18:59:55','2025-01-31 18:59:55'),(69,'/uploads/locations/zi-you-nv-shen-xiang/2-zi-you-nv-shen-xiang-4.jpg',NULL,12,NULL,'2025-01-31 18:59:56','2025-01-31 18:59:56'),(70,'/uploads/locations/zi-you-nv-shen-xiang/2-zi-you-nv-shen-xiang-5.jpg',NULL,12,NULL,'2025-01-31 18:59:57','2025-01-31 18:59:57'),(71,'/uploads/locations/lu-gang-lao-jie/3-lu-gang-lao-jie-1.jpg',NULL,9,NULL,'2025-01-31 19:21:40','2025-01-31 19:21:40'),(72,'/uploads/locations/lu-gang-lao-jie/3-lu-gang-lao-jie-2.jpg',NULL,9,NULL,'2025-01-31 19:21:41','2025-01-31 19:21:41'),(73,'/uploads/locations/lu-gang-lao-jie/3-lu-gang-lao-jie-3.jpg',NULL,9,NULL,'2025-01-31 19:21:41','2025-01-31 19:21:41'),(74,'/uploads/locations/lu-gang-lao-jie/3-lu-gang-lao-jie-4.jpg',NULL,9,NULL,'2025-01-31 19:21:43','2025-01-31 19:21:43'),(75,'/uploads/locations/lu-gang-lao-jie/3-lu-gang-lao-jie-5.jpg',NULL,9,NULL,'2025-01-31 19:21:43','2025-01-31 19:21:43'),(76,'/uploads/locations/ba-da-ya-si-fang-shui-shang-shi-chang/4-ba-da-ya-si-fang-shui-shang-shi-chang-1.jpg',NULL,10,NULL,'2025-01-31 19:25:35','2025-01-31 19:25:35'),(77,'/uploads/locations/ba-da-ya-si-fang-shui-shang-shi-chang/4-ba-da-ya-si-fang-shui-shang-shi-chang-2.jpg',NULL,10,NULL,'2025-01-31 19:25:36','2025-01-31 19:25:36'),(78,'/uploads/locations/ba-da-ya-si-fang-shui-shang-shi-chang/4-ba-da-ya-si-fang-shui-shang-shi-chang-3.jpg',NULL,10,NULL,'2025-01-31 19:25:37','2025-01-31 19:25:37'),(79,'/uploads/locations/ba-da-ya-si-fang-shui-shang-shi-chang/4-ba-da-ya-si-fang-shui-shang-shi-chang-4.jpg',NULL,10,NULL,'2025-01-31 19:25:37','2025-01-31 19:25:37'),(80,'/uploads/locations/ba-da-ya-si-fang-shui-shang-shi-chang/4-ba-da-ya-si-fang-shui-shang-shi-chang-5.jpg',NULL,10,NULL,'2025-01-31 19:25:38','2025-01-31 19:25:38'),(81,'/uploads/locations/tai-ping-shan/5-tai-ping-shan-1.jpg',NULL,11,NULL,'2025-01-31 19:28:39','2025-01-31 19:28:39'),(82,'/uploads/locations/tai-ping-shan/5-tai-ping-shan-2.jpg',NULL,11,NULL,'2025-01-31 19:28:40','2025-01-31 19:28:40'),(83,'/uploads/locations/tai-ping-shan/5-tai-ping-shan-3.jpg',NULL,11,NULL,'2025-01-31 19:28:41','2025-01-31 19:28:41'),(84,'/uploads/locations/tai-ping-shan/5-tai-ping-shan-4.jpg',NULL,11,NULL,'2025-01-31 19:28:42','2025-01-31 19:28:42'),(85,'/uploads/locations/tai-ping-shan/5-tai-ping-shan-5.jpg',NULL,11,NULL,'2025-01-31 19:28:42','2025-01-31 19:28:42'),(86,'/uploads/locations/ha-xiu-ta-te-tian-kong-bu-dao/6-ha-xiu-ta-te-tian-kong-bu-dao-1.jpg',NULL,8,NULL,'2025-01-31 19:39:35','2025-01-31 19:39:35'),(87,'/uploads/locations/ha-xiu-ta-te-tian-kong-bu-dao/6-ha-xiu-ta-te-tian-kong-bu-dao-2.jpg',NULL,8,NULL,'2025-01-31 19:39:35','2025-01-31 19:39:35'),(88,'/uploads/locations/ha-xiu-ta-te-tian-kong-bu-dao/6-ha-xiu-ta-te-tian-kong-bu-dao-3.jpg',NULL,8,NULL,'2025-01-31 19:39:36','2025-01-31 19:39:36'),(89,'/uploads/locations/ha-xiu-ta-te-tian-kong-bu-dao/6-ha-xiu-ta-te-tian-kong-bu-dao-4.jpg',NULL,8,NULL,'2025-01-31 19:39:37','2025-01-31 19:39:37'),(90,'/uploads/locations/ha-xiu-ta-te-tian-kong-bu-dao/6-ha-xiu-ta-te-tian-kong-bu-dao-5.jpg',NULL,8,NULL,'2025-01-31 19:39:38','2025-01-31 19:39:38'),(91,'/uploads/locations/fu-shi-shan/7-fu-shi-shan-1.jpg',NULL,13,NULL,'2025-01-31 19:47:10','2025-01-31 19:47:10'),(92,'/uploads/locations/fu-shi-shan/7-fu-shi-shan-2.jpg',NULL,13,NULL,'2025-01-31 19:47:11','2025-01-31 19:47:11'),(93,'/uploads/locations/fu-shi-shan/7-fu-shi-shan-3.jpg',NULL,13,NULL,'2025-01-31 19:47:12','2025-01-31 19:47:12'),(94,'/uploads/locations/fu-shi-shan/7-fu-shi-shan-4.jpg',NULL,13,NULL,'2025-01-31 19:47:13','2025-01-31 19:47:13'),(95,'/uploads/locations/fu-shi-shan/7-fu-shi-shan-5.jpg',NULL,13,NULL,'2025-01-31 19:47:13','2025-01-31 19:47:13'),(96,'/uploads/locations/xue-li-ge-ju-yuan/8-xue-li-ge-ju-yuan-1.jpg',NULL,14,NULL,'2025-01-31 19:50:13','2025-01-31 19:50:13'),(97,'/uploads/locations/xue-li-ge-ju-yuan/8-xue-li-ge-ju-yuan-2.jpg',NULL,14,NULL,'2025-01-31 19:50:14','2025-01-31 19:50:14'),(98,'/uploads/locations/xue-li-ge-ju-yuan/8-xue-li-ge-ju-yuan-3.jpg',NULL,14,NULL,'2025-01-31 19:50:15','2025-01-31 19:50:15'),(99,'/uploads/locations/xue-li-ge-ju-yuan/8-xue-li-ge-ju-yuan-4.jpg',NULL,14,NULL,'2025-01-31 19:50:16','2025-01-31 19:50:16'),(100,'/uploads/locations/xue-li-ge-ju-yuan/8-xue-li-ge-ju-yuan-5.jpg',NULL,14,NULL,'2025-01-31 19:50:17','2025-01-31 19:50:17'),(101,'/uploads/locations/sai-qie-ni-wen-quan-yu-chang/9-sai-qie-ni-wen-quan-yu-chang-1.jpg',NULL,7,NULL,'2025-01-31 19:57:01','2025-01-31 19:57:01'),(102,'/uploads/locations/sai-qie-ni-wen-quan-yu-chang/9-sai-qie-ni-wen-quan-yu-chang-2.jpg',NULL,7,NULL,'2025-01-31 19:57:02','2025-01-31 19:57:02'),(103,'/uploads/locations/sai-qie-ni-wen-quan-yu-chang/9-sai-qie-ni-wen-quan-yu-chang-3.jpg',NULL,7,NULL,'2025-01-31 19:57:03','2025-01-31 19:57:03'),(104,'/uploads/locations/sai-qie-ni-wen-quan-yu-chang/9-sai-qie-ni-wen-quan-yu-chang-4.jpg',NULL,7,NULL,'2025-01-31 19:57:04','2025-01-31 19:57:04'),(105,'/uploads/locations/sai-qie-ni-wen-quan-yu-chang/9-sai-qie-ni-wen-quan-yu-chang-5.jpg',NULL,7,NULL,'2025-01-31 19:57:05','2025-01-31 19:57:05'),(106,'/uploads/locations/ri-yue-tan/10-ri-yue-tan-1.jpg',NULL,16,NULL,'2025-01-31 20:03:31','2025-01-31 20:03:31'),(107,'/uploads/locations/ri-yue-tan/10-ri-yue-tan-2.jpg',NULL,16,NULL,'2025-01-31 20:03:32','2025-01-31 20:03:32'),(108,'/uploads/locations/ri-yue-tan/10-ri-yue-tan-3.jpg',NULL,16,NULL,'2025-01-31 20:03:32','2025-01-31 20:03:32'),(109,'/uploads/locations/ri-yue-tan/10-ri-yue-tan-4.jpg',NULL,16,NULL,'2025-01-31 20:03:33','2025-01-31 20:03:33'),(110,'/uploads/locations/ri-yue-tan/10-ri-yue-tan-5.jpg',NULL,16,NULL,'2025-01-31 20:03:33','2025-01-31 20:03:33'),(111,'/uploads/locations/lan-dong/11-lan-dong-1.jpg',NULL,17,NULL,'2025-01-31 20:07:58','2025-01-31 20:07:58'),(112,'/uploads/locations/lan-dong/11-lan-dong-2.jpg',NULL,17,NULL,'2025-01-31 20:07:58','2025-01-31 20:07:58'),(113,'/uploads/locations/lan-dong/11-lan-dong-3.jpg',NULL,17,NULL,'2025-01-31 20:07:59','2025-01-31 20:07:59'),(114,'/uploads/locations/lan-dong/11-lan-dong-4.jpg',NULL,17,NULL,'2025-01-31 20:08:00','2025-01-31 20:08:00'),(115,'/uploads/locations/lan-dong/11-lan-dong-5.jpg',NULL,17,NULL,'2025-01-31 20:08:02','2025-01-31 20:08:02'),(116,'/uploads/locations/shou-er-ta/12-shou-er-ta-1.jpg',NULL,18,NULL,'2025-01-31 20:18:51','2025-01-31 20:18:51'),(117,'/uploads/locations/shou-er-ta/12-shou-er-ta-2.jpg',NULL,18,NULL,'2025-01-31 20:18:52','2025-01-31 20:18:52'),(118,'/uploads/locations/shou-er-ta/12-shou-er-ta-3.jpg',NULL,18,NULL,'2025-01-31 20:18:52','2025-01-31 20:18:52'),(119,'/uploads/locations/shou-er-ta/12-shou-er-ta-4.jpg',NULL,18,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(120,'/uploads/locations/shou-er-ta/12-shou-er-ta-5.jpg',NULL,18,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(121,'/uploads/products/ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--1/1-ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--001.avif',NULL,NULL,1,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(122,'/uploads/products/ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--1/1-ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--002.avif',NULL,NULL,1,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(123,'/uploads/products/ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--1/1-ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--003.avif',NULL,NULL,1,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(124,'/uploads/products/ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--1/1-ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--004.avif',NULL,NULL,1,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(125,'/uploads/products/ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--1/1-ri-ben-huan-qiu-ying-cheng-men-piao-universalstudiosjapan-ri-ben-da-ban--guan-fang-shou-quan--005.avif',NULL,NULL,1,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(126,'/uploads/products/ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-2/2-ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-001.png',NULL,NULL,2,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(127,'/uploads/products/ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-2/2-ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-002.png',NULL,NULL,2,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(128,'/uploads/products/ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-2/2-ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-003.png',NULL,NULL,2,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(129,'/uploads/products/ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-2/2-ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-004.png',NULL,NULL,2,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(130,'/uploads/products/ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-2/2-ri-ben-da-ban--da-ban-le-gao-le-yuan-men-piao-legolanddiscoverycenterosaka-005.png',NULL,NULL,2,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(131,'/uploads/products/ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-3/3-ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-001.avif',NULL,NULL,3,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(132,'/uploads/products/ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-3/3-ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-002.avif',NULL,NULL,3,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(133,'/uploads/products/ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-3/3-ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-003.avif',NULL,NULL,3,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(134,'/uploads/products/ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-3/3-ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-004.avif',NULL,NULL,3,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(135,'/uploads/products/ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-3/3-ri-ben-esim-ka--mei-ri-gao-su--zong-liang--wu-xian-liu-liang-chi-dao-bao-fang-an--you-hui-65-zhe-005.avif',NULL,NULL,3,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(136,'/uploads/products/-you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-4/4--you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-001.avif',NULL,NULL,4,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(137,'/uploads/products/-you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-4/4--you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-002.avif',NULL,NULL,4,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(138,'/uploads/products/-you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-4/4--you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-003.avif',NULL,NULL,4,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(139,'/uploads/products/-you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-4/4--you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-004.avif',NULL,NULL,4,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(140,'/uploads/products/-you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-4/4--you-hui-54-zhe--han-guo-wang-ka--han-guo-gao-su-mei-ri-liu-liang--zong-liang-xing-esim-005.avif',NULL,NULL,4,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(141,'/uploads/products/tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan.avif/5-tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan-001.avif',NULL,NULL,5,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(142,'/uploads/products/tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan.avif/5-tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan-002.avif',NULL,NULL,5,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(143,'/uploads/products/tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan.avif/5-tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan-003.avif',NULL,NULL,5,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(144,'/uploads/products/tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan.avif/5-tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan-004.avif',NULL,NULL,5,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(145,'/uploads/products/tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan.avif/5-tai-wan-tao-yuan-ji-chang-jie-song--tao-yuan-guo-ji-ji-chang-tpe-wang-fan-005.avif',NULL,NULL,5,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(146,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-001.avif',NULL,NULL,6,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(147,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-002.avif',NULL,NULL,6,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(148,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-003.avif',NULL,NULL,6,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(149,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-004.avif',NULL,NULL,6,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(150,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-005.avif',NULL,NULL,6,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(151,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-001.avif',NULL,NULL,7,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(152,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-002.avif',NULL,NULL,7,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(153,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-003.avif',NULL,NULL,7,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(154,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-004.avif',NULL,NULL,7,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(155,'/uploads/products/ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-6/6-ri-ben-cheng-tian-ji-chang-zhuan-che-jie-song--ji-chang--dong-jing-23-qu-nei-ji-ge-da-jing-dian-005.avif',NULL,NULL,7,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(156,'/uploads/products/tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-8/8-tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-001.jpg',NULL,NULL,8,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(157,'/uploads/products/tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-8/8-tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-002.jpg',NULL,NULL,8,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(158,'/uploads/products/tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-8/8-tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-003.jpg',NULL,NULL,8,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(159,'/uploads/products/tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-8/8-tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-004.jpg',NULL,NULL,8,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(160,'/uploads/products/tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-8/8-tai-bei-zhan-lan--cao-jian-mi-sheng-de--gui-ji--yu--qi-ji-wcollectionmore1951-2005-005.jpg',NULL,NULL,8,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(161,'/uploads/products/tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-9/9-tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-001.jpeg',NULL,NULL,9,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(162,'/uploads/products/tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-9/9-tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-002.webp',NULL,NULL,9,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(163,'/uploads/products/tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-9/9-tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-003.jpg',NULL,NULL,9,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(164,'/uploads/products/tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-9/9-tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-004.jpg',NULL,NULL,9,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(165,'/uploads/products/tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-9/9-tai-bei-zhan-lan-animage-za-zhi-he-ji-bu-li-zhan-005.jpg',NULL,NULL,9,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(166,'/uploads/products/tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-10/10-tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-001.png',NULL,NULL,10,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(167,'/uploads/products/tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-10/10-tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-002.png',NULL,NULL,10,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(168,'/uploads/products/tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-10/10-tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-003.png',NULL,NULL,10,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(169,'/uploads/products/tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-10/10-tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-004.png',NULL,NULL,10,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(170,'/uploads/products/tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-10/10-tai-zhong--ke-bo-guan--guo-li-zi-ran-ke-xue-bo-wu-guan-men-piao-ke-bo-guan-005.png',NULL,NULL,10,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(171,'/uploads/products/fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-11/11-fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-001.png',NULL,NULL,11,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(172,'/uploads/products/fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-11/11-fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-002.png',NULL,NULL,11,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(173,'/uploads/products/fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-11/11-fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-003.png',NULL,NULL,11,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(174,'/uploads/products/fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-11/11-fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-004.png',NULL,NULL,11,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(175,'/uploads/products/fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-11/11-fa-guo--ba-li-di-shi-ni-fei-zhi-ding-ri-qi-le-yuan-men-piao-005.png',NULL,NULL,11,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(176,'/uploads/locations/bu-da-pei-si/13-bu-da-pei-si-1.jpg',NULL,1,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(177,'/uploads/locations/bu-da-pei-si/13-bu-da-pei-si-2.jpg',NULL,1,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(178,'/uploads/locations/bu-da-pei-si/13-bu-da-pei-si-3.jpg',NULL,1,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(179,'/uploads/locations/bu-da-pei-si/13-bu-da-pei-si-4.jpg',NULL,1,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(180,'/uploads/locations/bu-da-pei-si/13-bu-da-pei-si-5.jpg',NULL,1,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(181,'/uploads/locations/man-gu/14-man-gu-1.jpg',NULL,2,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(182,'/uploads/locations/man-gu/14-man-gu-2.jpg',NULL,2,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(183,'/uploads/locations/man-gu/14-man-gu-3.jpg',NULL,2,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(184,'/uploads/locations/man-gu/14-man-gu-4.jpg',NULL,2,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(185,'/uploads/locations/man-gu/14-man-gu-5.jpg',NULL,2,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(186,'/uploads/locations/wei-ye-na/15-wei-ye-na-1.jpg',NULL,3,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(187,'/uploads/locations/wei-ye-na/15-wei-ye-na-2.jpg',NULL,3,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(188,'/uploads/locations/wei-ye-na/15-wei-ye-na-3.jpg',NULL,3,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(189,'/uploads/locations/wei-ye-na/15-wei-ye-na-4.jpg',NULL,3,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(190,'/uploads/locations/wei-ye-na/15-wei-ye-na-5.jpg',NULL,3,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(191,'/uploads/locations/qi-si-ji-ku-lun-long/16-qi-si-ji-ku-lun-long-1.jpg',NULL,4,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(192,'/uploads/locations/qi-si-ji-ku-lun-long/16-qi-si-ji-ku-lun-long-2.jpg',NULL,4,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(193,'/uploads/locations/qi-si-ji-ku-lun-long/16-qi-si-ji-ku-lun-long-3.jpg',NULL,4,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(194,'/uploads/locations/qi-si-ji-ku-lun-long/16-qi-si-ji-ku-lun-long-4.jpg',NULL,4,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(195,'/uploads/locations/qi-si-ji-ku-lun-long/16-qi-si-ji-ku-lun-long-5.jpg',NULL,4,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(196,'/uploads/locations/sha-ba/17-sha-ba-1.jpg',NULL,5,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(197,'/uploads/locations/sha-ba/17-sha-ba-2.jpg',NULL,5,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(198,'/uploads/locations/sha-ba/17-sha-ba-3.jpg',NULL,5,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(199,'/uploads/locations/sha-ba/17-sha-ba-4.jpg',NULL,5,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(200,'/uploads/locations/sha-ba/17-sha-ba-5.jpg',NULL,5,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(201,'/uploads/locations/ming-gu-wu-shi/18-ming-gu-wu-shi-1.jpg',NULL,6,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(202,'/uploads/locations/ming-gu-wu-shi/18-ming-gu-wu-shi-2.jpg',NULL,6,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(203,'/uploads/locations/ming-gu-wu-shi/18-ming-gu-wu-shi-3.jpg',NULL,6,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(204,'/uploads/locations/ming-gu-wu-shi/18-ming-gu-wu-shi-4.jpg',NULL,6,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53'),(205,'/uploads/locations/ming-gu-wu-shi/18-ming-gu-wu-shi-5.jpg',NULL,6,NULL,'2025-01-31 20:18:53','2025-01-31 20:18:53');
/*!40000 ALTER TABLE `Images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Locations`
--

DROP TABLE IF EXISTS `Locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `google_place_id` varchar(255) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `google_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `main_image_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Locations_main_image_id_foreign_idx` (`main_image_id`),
  CONSTRAINT `Locations_main_image_id_foreign_idx` FOREIGN KEY (`main_image_id`) REFERENCES `Images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Locations`
--

LOCK TABLES `Locations` WRITE;
/*!40000 ALTER TABLE `Locations` DISABLE KEYS */;
INSERT INTO `Locations` VALUES (1,'布達佩斯','布達佩斯是匈牙利的首都，融合了多瑙河兩岸的布達和佩斯兩部分，被譽為“多瑙河上的明珠”。城市擁有壯觀的布達城堡、塞切尼鏈橋和宏偉的國會大廈。溫泉浴場如塞切尼溫泉和葛雷爾特浴場享譽國際，提供獨特的放鬆體驗。這裡既有悠久的歷史遺跡，也有充滿活力的咖啡館、藝術館和夜生活場景，是歐洲旅遊愛好者的理想目的地。布達佩斯四季皆宜，文化、景觀與美食交織出迷人魅力。',47.4979,19.0402,'ChIJyc_U0TTDQUcRYBEeDCnEAAQ','無營業時間資訊','匈牙利布達佩斯','https://maps.google.com/?q=%E5%8C%88%E7%89%99%E5%88%A9%E5%B8%83%E9%81%94%E4%BD%A9%E6%96%AF&ftid=0x4741c334d1d4cfc9:0x400c4290c1e1160','2025-02-07 07:33:06','2025-02-07 07:33:06',NULL),(2,'曼谷','曼谷（Bangkok），泰國首都，是一座充滿活力、文化豐富的現代化都市，融合傳統與現代魅力。著名景點包括金碧輝煌的大皇宮、臥佛寺與鄭王廟，展現泰國深厚的佛教文化。城市中擁有各種市集，如恰圖恰週末市場與水上市場，提供當地美食、手工藝品和購物樂趣。湄南河貫穿全市，夜景迷人。曼谷還以街頭美食、夜市和現代商場聞名，是探索泰國文化與生活的理想之地。',13.7563,100.502,'ChIJ82ENKDJgHTERIEjiXbIAAQE','無營業時間資訊','泰國曼谷','https://maps.google.com/?q=%E6%B3%B0%E5%9C%8B%E6%9B%BC%E8%B0%B7&ftid=0x311d6032280d61f3:0x10100b25de24820','2025-02-07 07:45:08','2025-02-07 07:45:08',NULL),(3,'維也納','維也納（Vienna）是奧地利的首都，以其悠久的音樂、藝術與文化歷史著稱，被譽為「音樂之都」。莫札特、貝多芬等音樂大師都曾在此創作。著名景點包括美泉宮、霍夫堡宮與聖史蒂芬大教堂，展現皇室輝煌的過去。維也納國立歌劇院和藝術博物館則體現其文化底蘊。城市中咖啡館文化深植人心，是放鬆與品味當地甜點的好去處。維也納還擁有大片綠地和多瑙河景色，是歷史與現代完美交融的歐洲城市。',48.2081,16.3713,'ChIJn8o2UZ4HbUcRRluiUYrlwv0','無營業時間資訊','奧地利維也納','https://maps.google.com/?q=%E5%A5%A7%E5%9C%B0%E5%88%A9%E7%B6%AD%E4%B9%9F%E7%B4%8D&ftid=0x476d079e5136ca9f:0xfdc2e58a51a25b46','2025-02-07 07:46:11','2025-02-07 07:46:11',NULL),(4,'契斯基庫倫隆','克魯姆洛夫（Český Krumlov）位於捷克南部，是一座中世紀小鎮，以其保存完好的歷史街區和克魯姆洛夫城堡而聞名，整座城鎮被列為世界文化遺產。蜿蜒的伏爾塔瓦河貫穿城中，紅瓦屋頂、石板街道和哥特、文藝復興、巴洛克風格建築交織出迷人景觀。城堡內擁有宏偉的花園和獨特的巴洛克劇院。這裡也以手工藝品店、畫廊和當地美食吸引遊客，是體驗捷克文化與歷史的絕佳去處。',48.8127,14.3175,'ChIJeRhuM5xdc0cRIN8UZg-vAAQ','無營業時間資訊','381 01捷克契斯基庫倫隆','https://maps.google.com/?q=381+01%E6%8D%B7%E5%85%8B%E5%A5%91%E6%96%AF%E5%9F%BA%E5%BA%AB%E5%80%AB%E9%9A%86&ftid=0x47735d9c336e1879:0x400af0f6614df20','2025-02-07 07:47:22','2025-02-07 07:47:22',NULL),(5,'沙巴','沙巴（Sabah）位於馬來西亞婆羅洲北部，是一個以自然景觀和多元文化著稱的旅遊勝地。沙巴擁有壯觀的京那巴魯山（東南亞最高峰之一）和廣闊的京那巴魯國家公園（世界自然遺產），適合喜愛徒步和登山的旅客。此外，沙巴的海岸線擁有美麗的沙灘與離島，如仙本那、馬布島和西巴丹島，是潛水愛好者的天堂。當地文化融合了馬來、華人和原住民族傳統，讓沙巴充滿活力與魅力。',5.4204,116.797,'ChIJnYq8yHFRFTIRB7OWbEMenYg','無營業時間資訊','馬來西亞沙巴','https://maps.google.com/?q=%E9%A6%AC%E4%BE%86%E8%A5%BF%E4%BA%9E%E6%B2%99%E5%B7%B4&ftid=0x32155171c8bc8a9d:0x889d1e436c96b307','2025-02-07 07:48:06','2025-02-07 07:48:06',NULL),(6,'名古屋市','名古屋市（Nagoya）是日本愛知縣的首府，也是日本第四大城市，以工業、商業與文化結合而著名。名古屋是豐田汽車的發源地，汽車產業和創新技術在此發展蓬勃。歷史景點包括名古屋城、大須觀音和熱田神宮，展現豐富的傳統文化。該市還擁有眾多博物館，如豐田博物館和科學博物館。名古屋美食以味噌豬排、鰻魚飯和手羽先雞翅聞名。現代化的購物區和傳統景點並存，使其成為日本中部的重要旅遊城市。',35.1814,136.907,'ChIJZSN7EJ5wA2ARUrPO6NQilio','無營業時間資訊','日本愛知縣名古屋市','https://maps.google.com/?q=%E6%97%A5%E6%9C%AC%E6%84%9B%E7%9F%A5%E7%B8%A3%E5%90%8D%E5%8F%A4%E5%B1%8B%E5%B8%82&ftid=0x6003709e107b2365:0x2a9622d4e8ceb352','2025-02-07 07:49:20','2025-02-07 07:49:20',NULL),(7,'塞切尼溫泉浴場','塞切尼溫泉位於匈牙利首都布達佩斯，是歐洲最大且最知名的溫泉浴場。這座歷史悠久的溫泉於1913年落成，採用了新巴洛克建築風格，並以其豐富的溫泉水療設施、壯麗的外觀及其健康療效聞名於世。\n\n          塞切尼溫泉坐落於城市公園內，是布達佩斯最受遊客喜愛的景點之一，無論是當地居民或國際遊客，都會來這裡體驗溫泉帶來的放鬆與療癒效果。\n\n            🏛 新巴洛克風格建築：\n            黃色外牆與精緻雕刻展現了奢華與莊重。\n            室內設計擁有華麗的圓頂、壁畫與雕塑，充滿濃厚的歐洲宮廷氣息。\n\n            📸 網美拍照勝地：\n            戶外溫泉池周圍的優雅柱廊與溫暖水霧交織，成為網紅最愛的拍照地點之一。',47.5187,19.0824,'ChIJd1VnBYbbQUcREiSNtgjDwMs','星期一: 07:00 – 20:00, 星期二: 07:00 – 20:00, 星期三: 07:00 – 20:00, 星期四: 07:00 – 20:00, 星期五: 07:00 – 20:00, 星期六: 08:00 – 20:00, 星期日: 08:00 – 20:00','Budapest, Állatkerti krt. 9-11, 1146 匈牙利','https://maps.google.com/?cid=14681949227417674770','2025-01-31 11:57:00','2025-01-31 11:57:00',NULL),(8,'哈修塔特天空步道','哈修塔特（Hallstatt）是奧地利著名的世界文化遺產小鎮，以其絕美的湖光山色聞名於世。而位於小鎮附近的哈修塔特天空步道（Skywalk Hallstatt）更是當地最受歡迎的景點之一，提供了無與倫比的高空景觀，讓每一位遊客都能飽覽阿爾卑斯山脈的壯麗風光\n \n            天空步道位於海拔約360米的高處，突出了山崖外的觀景平台宛如懸浮於半空，因而被稱為「無盡之梯」。從這裡可以俯瞰整個哈修塔特鎮和哈修塔特湖的全景，壯觀的景色令人屏息。天氣晴朗時，遠方的群山和湖面上的倒影交織在一起，仿若一幅天然畫卷。',47.5613,13.6436,'ChIJq7oizVA3cUcR4irrtZxljUk','星期一: 09:00 – 16:30, 星期二: 09:00 – 16:30, 星期三: 09:00 – 16:30, 星期四: 休息, 星期五: 休息, 星期六: 09:00 – 16:30, 星期日: 09:00 – 16:30','Salzbergstraße 21, 4830 Hallstatt, 奧地利','https://maps.google.com/?cid=5300004060226333410','2025-01-31 11:39:34','2025-01-31 11:39:34',NULL),(9,'鹿港老街','由於昔日的鹿港是以貿易為主，港口附近由於地利之便，便形成船行與商家的重要據點。瑤林街、埔頭街、大有街因臨近河道，於是成為船行與碼頭的集中區。\n\n            鹿港繁盛時碼頭區的主幹─舊街，即今之埔頭、瑤林、大有三條街道，曲折的紅磚巷道兩旁林立著重新整修過的舊式店屋，其奧妙的內部格局和舊式外觀耐人尋味，在此可找到若干老鹿港的風貌。\n\n            走進瑤林、埔頭二街的紅磚道，便令人油然而生一股古樸之意，宛如進入時空隧道。閩南風味的古老宅第，門楣上的各式避邪古物，以及兩旁的門聯，都訴說著舊時父老們的生活步調及型態。近年來由於觀光采風盛行，一些屋主便經營起民俗藝品店，使遊客在望風懷遠之餘，亦增添不少駐足之處。\n\n            街道特別彎曲，有時甚至成直角連串轉彎，所以會如此是先民智慧的展現與適應生活的艱辛，走在街上請仔細體會每一曲折所蘊含的歷史故事。經過長期歲月的沉澱，這裡氣氛由從前的熱鬧繁華轉為今日的淡泊悠閒。',24.0563,120.433,'ChIJbZ03BtZFaTQRVSahxk_O324','星期一: 00:00 – 06:00, 10:00 – 18:00, 星期二: 10:00 – 18:00, 星期三: 10:00 – 18:00, 星期四: 10:00 – 18:00, 星期五: 10:00 – 18:00, 星期六: 10:00 – 18:00, 星期日: 10:00 – 18:00','505台灣彰化縣鹿港鎮埔頭街3號','https://maps.google.com/?cid=7989331106008737365','2025-01-31 11:21:39','2025-01-31 11:21:39',NULL),(10,'芭達雅四方水上市場','泰國政府為了提振觀光產業並傳揚泰國文化，在芭達雅打造了這座超過3萬坪的芭達雅四方水上市場(Pattaya Floating Market)。四方水上市場以絕對的商業觀光考量為出發點，聚集泰國最讓旅客們喜好的食物、各種親身體驗活動與最好買伴手禮商店，以當地傳統建築打造一個一次就能完整看遍所有泰國文化的水上市場。\n\n            或許常去泰國的遊客會覺得芭達雅四方水上市場的商業氣氛太過濃厚，太多太雜的體驗也失去傳統水上市場純樸熱絡交易的醍醐味，但是嚴格來說芭達雅四方水上市場整體規劃還是相當成功，也成為每位前往芭達雅遊客都會列入清單中的景點✨',12.8679,100.905,'ChIJj7QUV5CVAjER2FSGCgOLIWM','星期一: 09:00 – 19:00, 星期二: 09:00 – 19:00, 星期三: 09:00 – 19:00, 星期四: 09:00 – 19:00, 星期五: 09:00 – 19:00, 星期六: 09:00 – 19:00, 星期日: 09:00 – 19:00','451 304 หมู่ที่ 12 Sukhumvit Rd, 泰國','https://maps.google.com/?cid=7143143329164055768','2025-01-31 11:25:34','2025-01-31 11:25:34',NULL),(11,'香港太平山','每個來香港的旅客，一定會搭乘香港太平山頂纜車，前往欣賞香港的百萬夜景，經過傾斜角度高達25.7度的山坡，穿梭中環的高樓大廈，超特別的纜車體驗已經成為香港最大景點之一。從1888年就開始運行的山頂纜車，在2022年推出了第六代綠色車廂，無梯式設計方便嬰兒車進出，屋頂更採用大面玻璃設計，讓旅客能清楚欣賞香港最美的一面！',22.2759,114.146,'ChIJsd2-34n_AzQROJPZYjyLMS4','無營業時間資訊','香港山頂太平山','https://maps.google.com/?cid=3328594691076231992','2025-01-31 11:28:38','2025-01-31 11:28:38',NULL),(12,'自由女神像','自由女神像，正式名稱為「為世界點亮自由之光」，是一座巨大的新古典主義雕塑，位於紐約港的自由島上。這個象徵自由與民主的標誌是法國人民送給美國的禮物，於1886年10月28日獻給美國。由法國雕塑家弗雷德里克·奧古斯特·巴托爾迪設計，其金屬框架由古斯塔夫·艾菲爾建造，這座雕像矗立著希望和自由的燈塔，每年迎接著數百萬遊客。\n \n            在紐約市體驗自由女神國家紀念碑和埃利斯島移民博物館的標誌性美麗和歷史意義。造訪這些地標將讓您獨特地窺探美國的過去，以及自由和希望的持久象徵。這座雄偉的紀念碑以其獨特的綠色和高聳的姿態，為渴望探索其歷史和文化意義的旅行者帶來難忘的體驗。',40.6893,-74.0445,'ChIJPTacEpBQwokRKwIlDXelxkA','星期一: 09:00 – 18:30, 星期二: 09:00 – 18:30, 星期三: 09:00 – 18:30, 星期四: 09:00 – 18:30, 星期五: 09:00 – 18:30, 星期六: 09:00 – 18:30, 星期日: 09:00 – 18:30','10004美國紐約','https://maps.google.com/?cid=4667599994556318251','2025-01-31 10:59:51','2025-01-31 10:59:51',NULL),(13,'富士山','富士山是日本最高的山峰，海拔3776公尺，橫跨山梨縣和靜岡縣。作為日本最著名的象徵，自古以來就是日本人信仰崇拜的對象，優美的山體型態，對許多藝術家的創作產生了深遠的影響。其歷史及文化價值已獲得國際認可，於2013年以『富士山-信仰的對象與藝術源泉』被登錄為世界文化遺產。富士山世界文化遺產的構成資產有25項，包括周邊的神社、登山道、熔岩樹型與湖泊等，充分顯示了富士山信仰的歷史及多樣性。\n\n            富士山的魅力不僅在於其壯麗的景色，還在於宗教信仰的歷史及賦予人們體驗大自然的機會。\n\n            登山道沿途的鳥居和祠堂，以及山頂附近的淺間神社，傳達了人們對富士山的信仰，而從雲海和熔岩流中，可以體驗富士山特有的地形和天氣現象。\n\n            登上山頂後，建議體驗一下在噴火口繞行一周的「鉢巡」活動。另外，務必要在山頂上看日出，據說這是日本最美麗的日出景觀。而且富士山完美對稱的山體形狀也是不容錯過的雄偉景觀。\n\n            觀賞富士山的最佳地點首推「河口湖」和「三保松原」。\n\n            在富士五湖之一「河口湖」可以看到整個富士山倒映在湖面上的獨特景觀「逆富士」，冬天從這裡看到的富士山被白雪覆蓋，景色美得令人陶醉。\n\n            在「三保松原」可以盡情飽覽富士山、松林和白色海浪共同構成的美麗景緻，是熱門的打卡景點。',35.3606,138.727,'ChIJmcj9QppiGWAR36TzFsn8oaY','無營業時間資訊','日本〒418-0112 靜岡縣富士宮市 Kitayama, 富士山','https://maps.google.com/?cid=12007156022150145247','2025-01-31 11:47:09','2025-01-31 11:47:09',NULL),(14,'雪梨歌劇院','雪梨歌劇院位於澳洲新南威爾斯州雪梨港，是一座舉世聞名的建築地標。憑藉其獨特的貝殼形屋頂設計，歌劇院不僅是澳洲最具代表性的建築之一，也被譽為20世紀最偉大的建築奇蹟，並於2007年被聯合國教科文組織列為世界文化遺產。\n\n            ✨✨主要亮點與旅遊資訊✨✨ \n\n            ✅ 世界頂級演出：雪梨歌劇院全年舉辦超過1,500場演出，涵蓋歌劇、交響樂、戲劇、舞蹈及現代音樂會。\n\n            ✅ 雪梨港全景：遊客可在周邊的環形碼頭（Circular Quay）或皇家植物園（Royal Botanic Gardens）欣賞歌劇院與雪梨港灣大橋（Sydney Harbour Bridge）的壯麗景色。\n\n            ✅ 導覽行程：歌劇院提供專業導覽服務，帶領遊客深入了解其歷史與建築工藝，甚至可探索幕後場景。',-33.8568,151.215,'ChIJ3S-JXmauEmsRUcIaWtf4MzE','無營業時間資訊','Bennelong Point, Sydney NSW 2000澳洲','https://maps.google.com/?cid=3545450935484072529','2025-01-31 11:50:12','2025-01-31 11:50:12',NULL),(15,'艾菲爾鐵塔','如果說，巴黎聖母院是古代巴黎的象徵，那麼，艾菲爾鐵塔就是現代巴黎的標誌。這座不和諧中求和諧，不可能中覓可能的工業文明的炫技之作給世人帶來了全新的審美體驗和生活感受。它像一個鋼鐵巨人高高地聳立在巴黎市中心塞納河畔的戰神廣場上，歲越百年，美麗依舊。\n 艾菲爾鐵塔是在1889年建立，天線高24公尺，總高324公尺。建造艾菲爾鐵塔的初衷是為了紀念法國大革命100周年和迎接在巴黎舉辦的國際博覽會。自1887年到1931年紐約帝國大廈落成前，保持了45年世界最高建築物的地位，目前仍是巴黎最有名的地標。\n\n            在建成之初，這座造型奇特的金屬龐然大物曾經引起法國人的反對。時光流逝，當年的反對之聲已經消散在歷史的塵囂中，如今的艾菲爾鐵塔是巴黎的絕對地標，法蘭西的驕傲。\n\n             鐵塔建築設計最著名的是防範強風吹襲的對稱鋼筋設計，兼具實用與美感考量，除了四個塔腳是用鋼筋水泥外，全身都用鋼鐵構成。艾菲爾鐵塔共分三層，分別在離地面57公尺、115公尺和276公尺處，從塔座到塔頂共有1711級階梯。三層眺望台雖然高度不同，各有不同的視野，能帶來不同的情趣。一個世紀以來，每年都有幾百萬人登臨塔頂，俯瞰巴黎市容，嘆為觀止。\n\n             要體會巴黎的浪漫風情，最好的方法之一，就是在天幕低垂之際登上艾菲爾鐵塔，落日輝映晚霞，等待星辰交替的巴黎夜景。',48.8584,2.29448,'ChIJLU7jZClu5kcR4PcOOO6p3I0','星期一: 09:00 – 00:00, 星期二: 09:00 – 00:00, 星期三: 09:00 – 00:00, 星期四: 09:00 – 00:00, 星期五: 09:00 – 00:00, 星期六: 09:00 – 00:00, 星期日: 09:00 – 00:00','Av. Gustave Eiffel, 75007 Paris, 法國','https://maps.google.com/?cid=10222232094831998944','2025-01-31 10:56:14','2025-01-31 10:56:14',NULL),(16,'日月潭','日月潭 位於台灣南投縣，是台灣最大的天然淡水湖，因湖面呈現日形與月形而得名。這座湖泊四周環繞青山，湖光山色美不勝收，被譽為台灣八景之一，是當地人與國際遊客最愛的旅遊勝地之一。\n \n          湖泊周圍擁有豐富的生態資源、美麗的環湖步道，還可以搭乘遊艇欣賞湖面風光，或者騎單車體驗環湖的愜意氛圍。此外，日月潭的日出、晨霧與夕陽 都是一大亮點，吸引無數攝影愛好者前來取景。\n \n          🚠 日月潭纜車\n          連接日月潭與九族文化村，可從高空俯瞰日月潭的壯闊湖景。\n          纜車行駛全長約 1.87 公里，途中可欣賞層疊的山巒與碧綠湖泊。\n \n          🚴‍♂️ 環湖自行車道\n          CNN 評選為「世界十大最美自行車道」之一，全長約 29 公里，適合單車愛好者。 \n          沿途可欣賞湖景、經過水社碼頭、伊達邵等知名景點，感受悠閒騎行的樂趣。\n\n          ⛴ 遊湖體驗\n          可搭乘遊艇穿梭於水社碼頭、玄光寺、伊達邵等地，近距離欣賞日月潭湖光山色。\n          遊湖過程中，還能聽導覽介紹日月潭的歷史。',23.8573,120.916,'ChIJBQDuduDVaDQRKKUSU_2mF-w','無營業時間資訊','555台灣南投縣魚池鄉日月潭','https://maps.google.com/?q=%E6%97%A5%E6%9C%88%E6%BD%AD&ftid=0x3468d5e076ee0005:0xec17a6fd5312a528','2025-01-31 12:03:31','2025-01-31 12:03:31',NULL),(17,'義大利藍洞','藍洞（Blue Grotto, Grotta Azzurra） 是義大利卡普里島的天然海蝕洞，因洞內呈現夢幻般的深藍光芒而聞名於世。當陽光穿過洞穴入口，光線在水底反射，使整個洞穴呈現如寶石般的藍色，彷彿置身於童話世界。\n\n            這個奇景早在古羅馬時期就已被發現，據說當時的皇帝提比略曾將藍洞作為私人游泳池，而如今，這裡已成為義大利最受歡迎的自然奇觀之一，吸引全球遊客前來朝聖。\n\n            🚣‍♂️ 搭乘小船進入洞穴：\n            由於洞口極小，遊客必須乘坐專門的小船 進入，每艘船最多容納 4 人。\n            進入洞穴時，乘客需要躺平，船夫會抓住洞口的鏈條，趁著海浪降低時迅速將船滑進去。\n            船夫通常會在洞內高歌義大利民謠，聲音在洞內迴盪，使體驗更添浪漫氣息。',40.561,14.2056,'ChIJffBOEFh3OxMRs1dhoL-srSs','無營業時間資訊','80071義大利那不勒斯省阿納卡普里藍洞','https://maps.google.com/?cid=3147361653631309747','2025-01-31 12:07:57','2025-01-31 12:07:57',NULL),(18,'韓國首爾塔','首爾塔，又稱南山塔，是韓國最具代表性的地標之一。這座位於南山上的通信與觀光塔，不僅是首爾的象徵，更是欣賞這座大都市壯麗全景的最佳地點之一。\n \n          自 1980 年對外開放以來，首爾塔以其絢麗的夜景、浪漫的愛情鎖牆與高空餐廳成為韓國情侶、遊客們的熱門打卡地點。\n\n          ⏰ 建議時間：\n          下午 4 點 - 晚上 10 點：可以欣賞日落、黃昏與夜景變換的美麗景色。\n          冬季夜晚 風較大，請記得穿保暖衣物。\n \n          🌟 特別推薦：\n          平日較少人潮，假日則可能需要排隊進入觀景台。\n          情侶約會、家庭旅遊、攝影愛好者 都很適合這個地點！',37.5512,126.988,'ChIJqWqOqFeifDURpYJ5LnxX-Fw','星期一: 10:00 – 23:00, 星期二: 10:00 – 23:00, 星期三: 10:00 – 23:00, 星期四: 10:00 – 23:00, 星期五: 10:00 – 23:00, 星期六: 10:00 – 00:00, 星期日: 10:00 – 23:00','105 Namsangongwon-gil, Yongsan District, Seoul, 南韓','https://maps.google.com/?cid=6699200636580889253','2025-01-31 12:18:50','2025-01-31 12:18:50',NULL);
/*!40000 ALTER TABLE `Locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderedItems`
--

DROP TABLE IF EXISTS `OrderedItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderedItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `activity_id` (`activity_id`),
  CONSTRAINT `ordereditems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ordereditems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ordereditems_ibfk_3` FOREIGN KEY (`activity_id`) REFERENCES `Activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderedItems`
--

LOCK TABLES `OrderedItems` WRITE;
/*!40000 ALTER TABLE `OrderedItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderedItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `chosen_date` date NOT NULL,
  `total_amount` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` text,
  `location_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'日本環球影城門票 Universal Studios Japan｜日本大阪 （官方授權）',1795,'日本環球影城官方授權門票，中文介面讓您輕鬆訂購\n在TapTour訂購日本環球影城門票後可立即拿到電子門票，現場掃 QR code 即可入園遊玩\n有效期限內，可依照日本環球影城月曆中相同票種之日期入園，保有行程絕佳彈性\n日本環球影城門票＋超級任天堂世界™ 園區保證入場套票，輕鬆玩轉瑪利歐世界',NULL,1,'2025-02-05 04:36:51','2025-02-05 04:36:51'),(2,'日本大阪｜大阪樂高樂園門票 LEGOLAND® Discovery Center Osaka',469,'此門票無進場時間限制，當日營業時間皆可入場\n小巧精緻的室內樂高樂園，適合大人小孩一起同樂\n遊樂設施種類多，樂高積木製造工廠、4D 劇場等歡迎來到樂高世界',NULL,3,'2025-02-05 04:39:05','2025-02-05 04:39:05'),(3,'日本eSIM卡｜每日高速、總量、無限流量吃到飽方案｜優惠65折',500,'本eSIM之日本Docomo/ kddi(au)/ Softbank 電信數據漫遊服務由China Mobile international Limited(中國移動國際有限公司)提供\nKKday日本eSIM提供4G服務並可使用熱點分享\n快速俐落享受 4G 上網，無需手忙腳亂\n收到憑證即可掃描後安裝使用，環保無耗材、免運費、零遺失風險',NULL,3,'2025-02-05 04:43:04','2025-02-05 04:43:04'),(4,'【優惠54折】韓國網卡｜韓國高速每日流量/總量型 eSIM',400,'本eSIM之韓國SKT電信數據漫遊服務由China Mobile international Limited(中國移動國際有限公司)提供\n韓國自由行推薦使用NAVER等Google以外地圖以獲得更好體驗\n上網新選擇，免換卡，快速俐落享受 4G 上網，無需手忙腳亂\n收到憑證即可掃描後安裝使用，不用往返奔波領取實體卡或等實體寄送\n環保無耗材、免運費、零遺失風險',NULL,4,'2025-02-05 04:44:48','2025-02-05 04:44:48'),(5,'台灣桃園機場接送｜桃園國際機場 (TPE)往返台北\\新北市區｜包車接機含舉牌服務',790,'TapTour機場接駁、機場接送，預約價格透明，雙北送機最低780、24hr安心客服，48小時前可免費取消，機場快線直達車\n嚴選機場接駁，最快可訂購當日 6 小時後搭車，價錢還比搭計程車便宜，不需排隊等計程車，品質保證\n接機服務依航班實際抵達時間免費等候  90分鐘並含舉牌服務，送機接送服務免費等候 30 分鐘',NULL,1,'2025-02-05 04:47:42','2025-02-05 04:47:42'),(6,'日本成田機場專車接送 ｜機場 ⮂東京23區內及各大景點',500,'成田機場、羽田機場接送，可指定送至東京市區飯店或是車站\n提供東京市區至迪士尼的單程接送服務，讓人輕鬆前往幻想國度！\n提供機場和東京市區至各大景點和近郊地區的單程接送服務，免卻乘搭公共交通工具的煩惱\n日本合法綠牌車專車接送，無須與他人共乘，安心抵達目的地\n司機提供日語與或中文對應，無需擔心溝通問題\n24 小時隨時待命！就算是深夜或凌晨的班機也可以放心使用\n可以接受緊急訂單，當天回復，並在短時間內派車',NULL,1,'2025-02-05 04:50:01','2025-02-05 04:50:01'),(7,'【泰國】機場包車接送 | 廊曼/素萬那普機場 ↔ 曼谷市區',500,'體驗從素萬那普/廊曼國際機場到曼谷酒店區住宿的便捷往返私人接送服務。選擇這些超級節省方案和車輛，完美配合您的旅行團，讓您友善專業的司機以最快的路線帶領您到達目的地。\n\n享受便利的專車機場接送服務，順利無憂地開始您的假期或商務旅行\n避免面對陌生公共交通的麻煩和壓力\n在消毒的車輛中舒適地放鬆身心，讓經驗豐富、友善的司機駕駛',NULL,1,'2025-02-05 04:51:44','2025-02-05 04:51:44'),(8,'台北展覽｜草間彌生的「軌跡」與「奇跡」',190,'重現 1998 台北雙年展經典作品《圓點的強迫妄想》\n聚焦 1951-2005 草間彌生最具開創性時期\n匯集繪畫、版畫、拼貼、軟雕塑、大型裝置、行為展演錄像、服裝等近 70 組／件作品，台灣首度登場',NULL,3,'2025-02-05 04:55:03','2025-02-05 04:55:03'),(9,'台北展覽 | Animage雜誌和吉卜力展',490,'豐富的展覽內容和創作手稿，見證日本動畫的發展故事！ \n經典吉卜力動畫的雜誌封面完全再現！粉絲們還能親自成為封面主角！ \n精美的特展限定商品，千萬不容錯過！',NULL,1,'2025-02-05 04:57:36','2025-02-05 04:57:36'),(10,'台中｜科博館｜國立自然科學博物館門票科博館',100,'全台第一座科學博物館，本館以科技整合、生活化、藝術化及以人為中心之主題展示\n擁有台灣第一座完全沉浸包覆的 IMAX 大型圓頂劇場，以及 GOTO 公司的光學星象儀投射的近乎真實星空，帶給台灣民眾迥異於以往的全新科學學習體驗。',NULL,1,'2025-02-05 05:00:12','2025-02-05 05:00:12'),(11,'法國 | 巴黎迪士尼非指定日期樂園門票',3039,'趁著各種套餐選項的便利，遊覽巴黎迪士尼樂園的一個或兩個主題樂園\n欣賞必看的 D-Light，在巴黎迪士尼樂園度過並享受美好的夜晚\n和經典迪士尼角色一同慶祝聖誕節和新年！',NULL,1,'2025-02-05 05:02:22','2025-02-05 05:02:22');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20250127183841-create-user.cjs'),('20250127184045-create-category.cjs'),('20250127184206-create-location.cjs'),('20250127184541-create-activity.cjs'),('20250127184716-create-product.cjs'),('20250127185318-create-order.cjs'),('20250127185536-create-order-product.cjs'),('20250127190326-create-comment.cjs'),('20250127190727-create-image.cjs'),('20250128052546-create-follower.cjs'),('20250203044909-add-main-image-id-to-locations.cjs'),('20250214073149-create-favorites.cjs');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `bio` text,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin','admin@example.com','$2a$10$sREoYJKAEbMt7rXLFOxGzua6W.PCFsygx5.YkACzbwrlM6Drn3xGS','http://localhost:3000/uploads/avatars/admin-tank.webp','吾乃冰熊熊覃克，管理員是也，魚與熊掌不可兼得，閣下選魚吧。',1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(2,'user','user@example.com','$2a$10$jM5tDLiWlfJLnrkR2IdPyOEfvnE6pj9DxBdZfQoW8fvqld1JEclVa','http://localhost:3000/uploads/avatars/user-igrit.webp','在下伊格利特，生前乃闇影軍團騎士統領，現如今只是一個普通使用者，生性害羞但劍術了得。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(3,'Liam Bennett','user1@example.com','$2a$10$w.z24xXON7oL1b9rIYm8f.MGsY5hO1fgU8ymAHNB1MRREdH2YOJBW','http://localhost:3000/uploads/avatars/avatar-1739247810377.png','白天寫程式，晚上探索星空，夢想是在火星上寫第一行 JavaScript。',1,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(4,'Olivia Hayes','user2@example.com','$2a$10$9svfustP8zfdVPlJ0D0PUONhWXkCkKOuMAJG5uhcMa58JKa85fdG.','http://localhost:3000/uploads/avatars/avatar-1739248094308.png','三杯咖啡後，我能解決任何 Bug；三天沒咖啡，我可能變成 Bug。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(5,'Ava Mitchell','user3@example.com','$2a$10$VAvoIEvpo2i7sMjARUdt.uLJeLApq30Xb8l6IeIHrsFLDLm9x.Fv6','http://localhost:3000/uploads/avatars/avatar-1739248342880.png','曾經嘗試用攝影捕捉時間的流動，後來發現，其實是時間捕捉了我。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(6,'Nathan Evans','user4@example.com','$2a$10$ODVkB8hh8/VZ.z4TizWYs.Ky08QSyjMHkClX3M0yvCd1HLqEWPwsy','http://localhost:3000/uploads/avatars/avatar-1739248557050.png','人生沒有 GPS，唯一能做的就是享受迷路的過程。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(7,'William Brooks','user5@example.com','$2a$10$Ga60atUzjjVCGoIHEftssenzfKjOJh/hKBw06RHVn7tR2D3csW82W','http://localhost:3000/uploads/avatars/avatar-1739248782841.png','人工智慧可能會改變世界，但我更希望它能幫我決定今晚吃什麼。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(8,'Ella Reed','user6@example.com','$2a$10$P0pv86t5HHMq7uErEwSaI.TvHBFFyttN0/O/Vf3oDZd.HgCF9sCEK','http://localhost:3000/uploads/avatars/avatar-1739249118988.png','植物用靜默生長，提醒我們最深刻的改變，往往來自無聲的堅持。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(9,'Mia Murphy','user7@example.com','$2a$10$0QtMUwS1Jt0dvWggKAk/Be0vGn9v4myc7DK3rvVGXLNdk6x6BdlSS','http://localhost:3000/uploads/avatars/avatar-1739249426293.png','一邊環遊世界，一邊尋找最好吃的街頭小吃，胃比護照蓋的章還多。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14'),(10,'Sophia White','user8@example.com','$2a$10$/4MiD/VOOQA8Dx3MbyktwOQUkD0MvOVGVf67ppkqqhgowuurf4aJ2','http://localhost:3000/uploads/avatars/avatar-1739249675693.png','夢境是一座未曾抵達的城市，而我總是在黎明前迷失在它的街道裡。',0,'2025-02-15 06:30:14','2025-02-15 06:30:14');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-15 15:09:54
