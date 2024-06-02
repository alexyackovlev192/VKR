-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: diplom
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `composition_gec`
--

DROP TABLE IF EXISTS `composition_gec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composition_gec` (
  `id_C` int NOT NULL AUTO_INCREMENT,
  `id_G` int NOT NULL,
  `id_U` int NOT NULL,
  PRIMARY KEY (`id_C`),
  KEY `id_G_idx` (`id_G`),
  KEY `id_U_idx` (`id_U`),
  CONSTRAINT `id_G FK` FOREIGN KEY (`id_G`) REFERENCES `gec` (`id_G`),
  CONSTRAINT `id_U FK2` FOREIGN KEY (`id_U`) REFERENCES `users` (`id_U`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `composition_gec`
--

LOCK TABLES `composition_gec` WRITE;
/*!40000 ALTER TABLE `composition_gec` DISABLE KEYS */;
INSERT INTO `composition_gec` VALUES (7,3,3),(12,3,7),(13,3,11),(19,6,15),(20,6,12),(21,6,11),(22,6,8),(23,7,12),(24,7,11),(25,7,8),(26,7,3),(47,15,12),(48,15,11),(49,15,8),(50,15,20),(51,15,3),(52,16,15),(53,16,12),(54,16,11),(55,16,8),(56,16,20),(57,17,15),(58,17,12),(59,17,11),(60,17,8),(61,17,20),(79,23,17),(80,23,7),(81,23,15),(82,23,12),(83,24,17),(84,24,7),(85,24,21),(86,24,20),(90,34,15),(91,34,12),(92,34,11),(93,34,8),(94,35,12),(95,35,11),(96,35,8),(97,35,20),(98,36,7),(99,36,15),(100,36,12),(101,36,11),(102,36,8),(103,37,15),(104,37,12),(105,37,8),(106,37,11),(107,39,7),(108,39,15),(109,39,12),(110,39,11),(111,39,8),(112,40,12),(113,40,11),(114,40,20),(115,40,3),(116,41,15),(117,41,12),(118,41,11),(119,41,8),(120,42,7),(121,42,15),(122,42,3),(123,42,21),(124,42,4),(125,43,17),(126,43,7),(127,43,20),(128,43,16),(129,43,18),(131,5,12),(132,5,11),(133,5,20),(134,5,3),(136,44,12),(137,44,11),(138,44,20),(139,44,3),(140,45,17),(141,45,7),(142,45,15),(143,45,12),(144,45,3),(145,45,18),(146,5,8),(147,46,17),(148,46,7),(149,46,15),(150,46,11),(151,47,17),(152,47,7),(153,47,15),(154,47,11),(155,47,16),(156,47,18),(157,48,17),(158,48,7),(159,48,15),(160,48,18),(161,48,11),(162,49,17),(163,49,15),(164,49,12),(165,49,11),(166,50,11),(172,50,17),(173,50,7),(174,50,18),(178,51,18),(179,51,17),(180,51,7),(181,51,20),(182,51,3),(183,52,17),(184,52,7),(185,52,11),(186,52,23),(187,52,20),(188,51,11),(189,53,3),(190,53,4),(191,53,16);
/*!40000 ALTER TABLE `composition_gec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criteria`
--

DROP TABLE IF EXISTS `criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `criteria` (
  `id_Cr` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Value` float NOT NULL,
  PRIMARY KEY (`id_Cr`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteria`
--

LOCK TABLES `criteria` WRITE;
/*!40000 ALTER TABLE `criteria` DISABLE KEYS */;
INSERT INTO `criteria` VALUES (1,'Актуальность',0.3),(2,'Сложность работы',0.4),(3,'Интерфейс',0.3);
/*!40000 ALTER TABLE `criteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defense_presence`
--

DROP TABLE IF EXISTS `defense_presence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defense_presence` (
  `id_DP` int NOT NULL AUTO_INCREMENT,
  `id_DS` int NOT NULL,
  `id_U` int NOT NULL,
  `Status` varchar(45) NOT NULL,
  PRIMARY KEY (`id_DP`),
  KEY `id_DS FK_idx` (`id_DS`),
  KEY `id_U FKK_idx` (`id_U`),
  CONSTRAINT `id_DS FK` FOREIGN KEY (`id_DS`) REFERENCES `defense_schedule` (`id_DS`),
  CONSTRAINT `id_U FKK` FOREIGN KEY (`id_U`) REFERENCES `users` (`id_U`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defense_presence`
--

LOCK TABLES `defense_presence` WRITE;
/*!40000 ALTER TABLE `defense_presence` DISABLE KEYS */;
INSERT INTO `defense_presence` VALUES (1,47,11,'+'),(2,47,17,'+'),(3,47,21,'+'),(4,47,18,'+'),(5,48,21,'+'),(6,48,18,'+'),(7,48,17,'+'),(8,48,11,'+');
/*!40000 ALTER TABLE `defense_presence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defense_schedule`
--

DROP TABLE IF EXISTS `defense_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defense_schedule` (
  `id_DS` int NOT NULL AUTO_INCREMENT,
  `id_G` int NOT NULL,
  `id_D` int NOT NULL,
  `date` date NOT NULL,
  `time` varchar(20) NOT NULL,
  `classroom` varchar(50) NOT NULL,
  PRIMARY KEY (`id_DS`),
  KEY `id_G FK3_idx` (`id_G`),
  KEY `id_D FKds_idx` (`id_D`),
  CONSTRAINT `id_D FKds` FOREIGN KEY (`id_D`) REFERENCES `directions` (`id_D`),
  CONSTRAINT `id_G FK3` FOREIGN KEY (`id_G`) REFERENCES `gec` (`id_G`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defense_schedule`
--

LOCK TABLES `defense_schedule` WRITE;
/*!40000 ALTER TABLE `defense_schedule` DISABLE KEYS */;
INSERT INTO `defense_schedule` VALUES (5,3,2,'2024-06-14','10:00-14:00','1-311'),(35,6,3,'2024-04-05','10:00-14:00','1-200'),(36,7,4,'2024-04-11','10:00-14:00','1-200'),(37,6,3,'2024-05-16','10:00-14:00','1-212'),(38,23,4,'2024-05-21','10:00-14:00','1-200'),(39,24,1,'2024-05-29','10:00-14:00','1-200'),(40,17,1,'2024-05-30','10:00-14:00','1-200'),(41,24,1,'2024-04-02','10:00-14:00','1-300'),(42,46,3,'2024-06-20','10:00-14:00','1-300'),(43,47,3,'2024-04-01','10:00-14:00','1-200'),(44,37,2,'2024-03-31','10:00-14:00','1-300'),(45,48,4,'2024-02-29','10:00-14:00','1-333'),(46,49,1,'2024-06-07','10:00-14:00','1-100'),(47,50,1,'2024-03-01','10:00-14:00','1-400'),(48,51,1,'2024-02-01','10:00-14:00','1-300'),(49,52,1,'2024-06-03','10:00-14:00','1-200'),(50,53,1,'2024-01-31','10:00-14:00','1-200');
/*!40000 ALTER TABLE `defense_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defense_schedule_students`
--

DROP TABLE IF EXISTS `defense_schedule_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defense_schedule_students` (
  `id_DSS` int NOT NULL AUTO_INCREMENT,
  `id_DS` int NOT NULL,
  `id_S` int NOT NULL,
  PRIMARY KEY (`id_DSS`),
  KEY `id_DS_idx` (`id_DS`),
  KEY `id_S_idx` (`id_S`),
  CONSTRAINT `id_DS FK_S` FOREIGN KEY (`id_DS`) REFERENCES `defense_schedule` (`id_DS`),
  CONSTRAINT `id_S` FOREIGN KEY (`id_S`) REFERENCES `students` (`id_S`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defense_schedule_students`
--

LOCK TABLES `defense_schedule_students` WRITE;
/*!40000 ALTER TABLE `defense_schedule_students` DISABLE KEYS */;
INSERT INTO `defense_schedule_students` VALUES (13,36,8),(18,35,6),(21,37,7),(24,36,5),(25,38,8),(26,38,5),(27,5,7),(28,5,8),(29,39,9),(30,39,6),(31,39,11),(32,36,10),(33,36,7),(34,36,6),(35,36,29),(36,35,29),(37,41,6),(38,35,10),(39,35,7),(40,42,7),(41,42,8),(42,42,5),(43,42,6),(44,43,9),(45,43,10),(46,43,7),(47,43,8),(48,43,5),(49,43,6),(50,44,35),(51,44,10),(52,44,28),(53,41,34),(54,41,7),(55,41,8),(56,41,29),(57,41,30),(58,41,31),(59,41,32),(60,41,33),(61,41,11),(62,44,6),(63,45,19),(64,45,13),(65,45,14),(66,45,15),(67,45,16),(68,45,17),(69,45,18),(70,46,8),(71,46,29),(72,46,30),(73,46,31),(74,46,32),(75,46,33),(76,39,29),(77,39,30),(78,39,31),(79,47,29),(80,47,30),(81,47,31),(82,47,32),(83,47,33),(84,48,30),(85,48,31),(86,48,32),(87,48,33),(88,48,11),(89,48,20),(90,49,31),(91,49,32),(92,49,33),(93,49,11),(94,49,12),(95,49,20);
/*!40000 ALTER TABLE `defense_schedule_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directions`
--

DROP TABLE IF EXISTS `directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directions` (
  `id_D` int NOT NULL AUTO_INCREMENT,
  `Name_direction` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`id_D`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directions`
--

LOCK TABLES `directions` WRITE;
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` VALUES (1,'ИВТ','09.03.01'),(2,'ПРИНЖ','09.03.04'),(3,'ПИ','09.03.02'),(4,'ИСТ','09.03.03');
/*!40000 ALTER TABLE `directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gec`
--

DROP TABLE IF EXISTS `gec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gec` (
  `id_G` int NOT NULL AUTO_INCREMENT,
  `id_D` int NOT NULL,
  `id_U` int NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `year` varchar(10) NOT NULL,
  PRIMARY KEY (`id_G`),
  KEY `id_U_idx` (`id_U`),
  KEY `id_D_idx` (`id_D`),
  CONSTRAINT `id_D` FOREIGN KEY (`id_D`) REFERENCES `directions` (`id_D`),
  CONSTRAINT `id_U FK` FOREIGN KEY (`id_U`) REFERENCES `users` (`id_U`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gec`
--

LOCK TABLES `gec` WRITE;
/*!40000 ALTER TABLE `gec` DISABLE KEYS */;
INSERT INTO `gec` VALUES (3,1,8,'Завершила работу','2024'),(5,2,21,'Завершила работу','2024'),(6,3,8,'Завершила работу','2024'),(7,4,8,'Завершила работу','2024'),(15,1,21,NULL,'2024'),(16,1,21,NULL,'2024'),(17,1,8,NULL,'2024'),(23,4,21,'Завершила работу','2024'),(24,1,8,NULL,'2024'),(34,2,21,NULL,'2024'),(35,3,8,NULL,'2024'),(36,2,8,NULL,'2024'),(37,2,8,NULL,'2024'),(38,2,8,NULL,'2024'),(39,2,8,NULL,'2024'),(40,3,8,NULL,'2024'),(41,2,8,NULL,'2024'),(42,2,8,NULL,'2024'),(43,2,8,NULL,'2024'),(44,2,8,NULL,'2024'),(45,1,21,'Завершила работу','2024'),(46,3,21,NULL,'2024'),(47,3,21,NULL,'2024'),(48,4,21,'Завершила работу','2024'),(49,1,7,NULL,'2024'),(50,1,21,'Завершила работу','2024'),(51,1,21,NULL,'2024'),(52,1,8,NULL,'2024'),(53,1,21,NULL,'2024');
/*!40000 ALTER TABLE `gec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result_comission_member`
--

DROP TABLE IF EXISTS `result_comission_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result_comission_member` (
  `id_RCM` int NOT NULL AUTO_INCREMENT,
  `id_DSS` int NOT NULL,
  `id_U` int NOT NULL,
  `Result` float NOT NULL,
  `RecMagistracy` varchar(45) DEFAULT NULL,
  `RecPublication` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_RCM`),
  KEY `id_DSS_idx` (`id_DSS`),
  KEY `id_U_idx` (`id_U`),
  CONSTRAINT `id_DSS` FOREIGN KEY (`id_DSS`) REFERENCES `defense_schedule_students` (`id_DSS`),
  CONSTRAINT `id_U FK_R` FOREIGN KEY (`id_U`) REFERENCES `users` (`id_U`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_comission_member`
--

LOCK TABLES `result_comission_member` WRITE;
/*!40000 ALTER TABLE `result_comission_member` DISABLE KEYS */;
INSERT INTO `result_comission_member` VALUES (21,18,11,3,'Да','Да'),(22,21,11,3.4,'Да',NULL),(23,29,21,3,'Да',NULL),(24,30,21,2,NULL,NULL),(25,13,11,3,'Да',NULL),(26,40,11,4.3,'Да','Да'),(27,41,11,4.1,'Да','Да'),(28,42,11,3.4,'Да','Да'),(32,43,11,3.1,'Да',NULL),(73,90,11,2,'Да','Да'),(74,91,11,3,'Да','Да'),(75,92,11,2,NULL,'Да'),(76,93,11,2,'Да','Да'),(77,94,11,2,'Да','Да'),(78,95,11,2,'Да','Да'),(79,51,11,2.3,'Да','Да'),(80,37,21,3,'Да','Да'),(81,53,21,3.8,'Да',NULL),(82,54,21,3,'Да','Да'),(83,50,11,2.7,NULL,'Да'),(84,52,11,3.4,NULL,'Да'),(85,62,11,4.3,NULL,NULL),(86,84,11,2.3,'Да',NULL),(87,44,11,3,'Да',NULL),(88,85,11,4,'Да','Да');
/*!40000 ALTER TABLE `result_comission_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result_commission secretary`
--

DROP TABLE IF EXISTS `result_commission secretary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result_commission secretary` (
  `id_RCS` int NOT NULL AUTO_INCREMENT,
  `id_DSS` int NOT NULL,
  `id_U` int NOT NULL,
  `Result` int NOT NULL,
  `RecMagistracy` varchar(45) DEFAULT NULL,
  `RecPublication` varchar(45) DEFAULT NULL,
  `NumberProtocol` int NOT NULL,
  PRIMARY KEY (`id_RCS`),
  KEY `id_DSS_idx` (`id_DSS`),
  KEY `id_U FK_RC_idx` (`id_U`),
  CONSTRAINT `id_DSS FK` FOREIGN KEY (`id_DSS`) REFERENCES `defense_schedule_students` (`id_DSS`),
  CONSTRAINT `id_U FK_RC` FOREIGN KEY (`id_U`) REFERENCES `users` (`id_U`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_commission secretary`
--

LOCK TABLES `result_commission secretary` WRITE;
/*!40000 ALTER TABLE `result_commission secretary` DISABLE KEYS */;
INSERT INTO `result_commission secretary` VALUES (46,40,21,5,'Да','Да',1111),(47,41,21,3,'Да','Да',1111111),(48,42,21,5,'Да',NULL,1111),(49,42,21,4,'Да','Да',222),(50,43,21,4,'Да','Да',2222),(51,63,21,4,'Да','Да',34537),(52,64,21,4,'Да','Да',5745754),(53,65,21,5,'Да','Да',57547547);
/*!40000 ALTER TABLE `result_commission secretary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_R` int NOT NULL AUTO_INCREMENT,
  `Name_role` varchar(80) NOT NULL,
  PRIMARY KEY (`id_R`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Администратор'),(2,'Член комиссии'),(3,'Технический секретарь'),(4,'Секретарь комиссии');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id_S` int NOT NULL AUTO_INCREMENT,
  `Fullname` varchar(100) NOT NULL,
  `Group` varchar(10) NOT NULL,
  `Topic` varchar(200) NOT NULL,
  `ScientificAdviser` varchar(100) NOT NULL,
  `Avg_Mark` float NOT NULL,
  `Red_Diplom` varchar(30) DEFAULT NULL,
  `YearOfDefense` varchar(10) NOT NULL,
  `id_D` int NOT NULL,
  PRIMARY KEY (`id_S`),
  KEY `id_D_idx` (`id_D`),
  CONSTRAINT `id_D FKstu` FOREIGN KEY (`id_D`) REFERENCES `directions` (`id_D`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (5,'Хрявин Кирилл Вадимович','4011','Разработка серверной части веб-сервиса для сопровождения защит ВКР','Потемкина Снежана Владиславовна',4.4,'1','2024',4),(6,'Яковлев Александр Васильевичппп','4011','Разработка клиентской части веб-сервиса для сопровождения защит ВКР','Потемкина Снежана Владиславовна',4.6,'1','2024',2),(7,'Качин Денис Романович','4011','Разработка сервиса геолокации документов','Задорожный Александ Михайлович',4.8,'1','2024',1),(8,'Сутин Данила Сергеевич','4112','Разработка сервиса для обучения программированию','Задорожный Александ Михайлович',4.6,NULL,'2024',1),(9,'Бутенко Екатерина Александровна','4011','Разработка нейронной сети для анализа','Задорожный Александр Михайлович',4.9,'1','2024',4),(10,'Воробьев Даниил Андреевич','4011','Разработка сервиса для изменения расписания','Потемкина Снежана Владиславовна',4.8,'1','2024',2),(11,'test','4011','test','test',1,NULL,'2024',1),(12,'test1','4011','test1','test1',1,'1','2024',1),(13,'test2','4011','test2','test2',1,'1','2024',4),(14,'test3','4011','test3','test3',1,NULL,'2024',4),(15,'test4','4011','test4','test4',1,'1','2024',4),(16,'test5','4011','test5','test5',1,'1','2024',4),(17,'test6','4011','test6','test6',1,'1','2024',4),(18,'test7','4011','test7','test7',1,'1','2024',4),(19,'test','4011','Разработка сервиса геолокации документов dfshhfhfdhfdh','Задорожный Александ Михайлович',1,'1','2024',4),(20,'test10','4011','test10','test10',1,'1','2024',1),(27,'test9','4011','test9','test9',1,'1','2024',1),(28,'aaa','4011','aaa','aaa',1,'1','2024',2),(29,'aa','4011','aa','aa',1,NULL,'2024',1),(30,'stud1','4011','stud1','stud1',1,NULL,'2024',1),(31,'stud2','4011','stud1','stud1',1,NULL,'2024',1),(32,'stud3','4011','stud3','stud3',1,NULL,'2024',1),(33,'stud4','4011','stud4','stud4',1,NULL,'2024',1),(34,'Бархатова Ирина Александровна','4011','Разработка нейронной сети для анализа','Задорожный Александр Михайлович',1,'1','2024',1),(35,'Бархатова Ирина Александровна','4011','Разработка нейронной сети для анализа','Задорожный Александр Михайлович',1,NULL,'2024',2),(36,'testttttt','4011','testttttt','testttttt',1,'1','2024',1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id_UR` int NOT NULL AUTO_INCREMENT,
  `id_U` int NOT NULL,
  `id_R` int NOT NULL,
  PRIMARY KEY (`id_UR`),
  KEY `id_U_idx` (`id_U`),
  KEY `id_R_idx` (`id_R`),
  CONSTRAINT `id_R` FOREIGN KEY (`id_R`) REFERENCES `roles` (`id_R`),
  CONSTRAINT `id_U` FOREIGN KEY (`id_U`) REFERENCES `users` (`id_U`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,3,2),(2,4,2),(4,6,1),(6,8,2),(7,8,4),(8,11,2),(9,12,2),(10,13,3),(11,15,2),(19,16,2),(20,17,2),(21,18,2),(22,19,3),(23,20,2),(35,21,2),(36,21,4),(37,22,2),(38,23,4),(39,23,2),(40,24,4),(41,25,4),(42,26,4),(43,26,2),(44,26,3),(45,27,3),(46,28,4),(47,28,2),(48,29,2),(49,30,2),(50,31,2),(51,7,4),(52,7,3),(53,7,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_U` int NOT NULL AUTO_INCREMENT,
  `Fullname` varchar(150) DEFAULT NULL,
  `Login` varchar(30) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Mail` varchar(40) DEFAULT NULL,
  `Post` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_U`),
  UNIQUE KEY `Login_UNIQUE` (`Login`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Петр Павлович Сычев','PPS.20','$2a$07$GOk4.w0allqCdGaBWOHIpuKXgQZ.pxOA8uiLQe2BimeYIfLQtq8hS','pspdasd@mail.ru','доцентыа'),(4,'Сычева Маргарита Петровна','SMP.20','$2a$07$.RQjRoetVXP/UhE3urFxSeQmlVMB/HrcntzavRB47WJb2Xyxnsmom','sdfsdfd@list.ru','старший преподаватель'),(6,NULL,'admin','$2a$07$d6e52suEVjT2OngFrPPrYePm.NlxMTNR6hK0X5VZhysuAyuyfirhu',NULL,''),(7,'Беднякова Татьяна Михайловна','BTM.20','$2a$07$KwnoL2rhjeK.mTlVAmwJEe43S3HesQJvdTodkz4wS.fkB6ao0Cv.a','aleksandar.iack0vlev@mail.ru','доцент'),(8,'Крейдер Оксана Александровна','KOA.20','$2a$07$GMa0YXnSsrZskIVmwwv7pu3aV20kkz1sER3IbsxjB1cvxHLuswr/6','Kreider@list.ru','доцент'),(11,'Задорожный Александр Михайлович','ZAM.20','$2a$07$MZV0A5EoOWmigLKgjmaB9uLVizxcxLFtc1.gA34YqOCc7z1QX97Ue','khkv.20@uni-dubna.ru','доцент'),(12,'Дедович Татьяна Григорьевна','DTG.20','$2a$07$bPKluT32i9kHg6gXxmUdsOgcyakCsIu3XaOUjaWeiyvX7agY.ExJu','psdapad@mail.ru','доцент'),(13,'Махалкина Татьяна Олеговна','MTO.20','$2a$07$9XnzE6avoCPFxpW31KvTueoNMIj3Wv2locv.Jr3to4.zXaiYqjo5e','makhalkinat@mail.ru','старший преподаватель'),(15,'Белов Михаил Александрович','BMA.20','$2a$07$xhPhSzBDsgCf2oQMmp6nR.V/1Uh7gYcfuxI3GtGQvq7oCU/pEs0wS','a.yack0vlev@mail.ru','доцент'),(16,'Тятюшкина Ольга Юрьевна','TOU.20','$2a$07$vRazrO8uQH1c8Y7n5zV1veFZjlOVQcbNmp/0CDvZ0f9Fv4FtkpeHu','Tyatushkina@mail.ru','старший преподаватель'),(17,'Бархатова Ирина Александровна','BIA.20','$2a$07$K2GmbORdEpM0110UtrW8Gu/WWTea4F18JmqQWAbPJdGzIwyhhfNJ.','yaav.20@uni-dubna.ru','старший преподаватель'),(18,'Черемисина Евгения Наумовна','HEN.20','$2a$07$f9mkPDdxFjD9J0RwtmTygOJWYyodDyOW6vp.U6vJNOcYWXKui3zsC','yaav.20@uni-dubna.ru','профессор'),(19,'Реброва Кристина Николаевна','RKN.20','$2a$07$lxpiOaEr9wr4UzLagl.5zOqvKaC/cnogdYHihWMLTW4dBfThrZ1Tq','rebrova@uni-dubna.ru','старший преподаватель'),(20,'Перепёлкин Евгений Евгеньевич','PEE.20','$2a$07$N7fvopRO7R/sbEwIRIyKTO7FLRU5QeZmX2IdnFg9tutvgAwEMuNOK','perepelkin@uni-dubna.ru','профессор'),(21,'Русакова Елена Александровна','REA.20','$2a$07$dds478ax5vkV.MC9a3RRC.nmlacsVrk9F9mPkwjs5fZ.PY7njKRcW','yaav.20@uni-dubna.ru','старший преподавательааа'),(22,'test','test','$2a$07$BVNXlXF3czG8YYh4FGFZG.oAiabuRhLRg/06DdVyDpzzcJeHmYRm.','test@uni-dubna.ru','доцент'),(23,'Иванов Иван Иванович','test.24','$2a$07$jQ9.vNxNQs2QVdNQBFBQTegW3vRHtYcgD7CBXZG7a4ZDZu/BHga1m','test@uni-dubna.ru',''),(24,'Иванов Иван Иванович','III.24','$2a$07$N5CmuVi8Fm3Fh13R0jAqRefM25ejZkDdDbWUnzqHORhUFsHelIAL2','test@uni-dubna.ru','доцент'),(25,'testing','XXX.24','$2a$07$cEXeqXl9prFLTweRg/kmTeqXvJ5z9.0NuQMolj3SAL7roBQvVq.Sy','test@uni-dubna.ru','доцент'),(26,'aboba','X.24','$2a$07$6VjVCyqyd6u0MxlBJ/m7AeNPnPdvdxOBu43pSeZrpP8SUJ56hosA6','test@uni-dubna.ru','доцент'),(27,'aboba1','X1.24','$2a$07$UrLEuoIsdLokRe/1M/o.juxyE2LZW4IrZPJRZv9KEGgB6DEy8lrUK','test@uni-dubna.ru','доцент'),(28,'aboba2','X2.24','$2a$07$dsdkIwz3aHsEA0.peJMe..phnQGX63k52zstabvIBaW.kSiCWP0DG','test@uni-dubna.ru','доцент'),(29,'user1','user1','$2a$07$0.FEMC43.KBOo/N8SAnl/edy6cP9o4QTb0xduuTWm4j2NdGKlY9Wy','test@uni-dubna.ru','доцент'),(30,'user2','user2','$2a$07$V7h1qqitmyh9dLjguPs43OESWqsbPsx5wtb2CqV2l/9/5u3KUM6dy','test@uni-dubna.ru','доцент'),(31,'user3','user3','$2a$07$piz76/SjTaWqSaKYIxOlu.QOXdB5bEPW.3h/Z1/xNr8kkuAFE7gYi','test@uni-dubna.ru','доцент');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'diplom'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-02 22:32:12
