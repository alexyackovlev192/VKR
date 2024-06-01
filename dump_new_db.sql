CREATE DATABASE  IF NOT EXISTS `newdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `newdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: diplom
-- ------------------------------------------------------
-- Server version	8.0.34

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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `composition_gec`
--

LOCK TABLES `composition_gec` WRITE;
/*!40000 ALTER TABLE `composition_gec` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defense_presence`
--

LOCK TABLES `defense_presence` WRITE;
/*!40000 ALTER TABLE `defense_presence` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defense_schedule`
--

LOCK TABLES `defense_schedule` WRITE;
/*!40000 ALTER TABLE `defense_schedule` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defense_schedule_students`
--

LOCK TABLES `defense_schedule_students` WRITE;
/*!40000 ALTER TABLE `defense_schedule_students` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directions`
--

LOCK TABLES `directions` WRITE;
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` VALUES (1,'ИВТ','09.03.01'),(2,'ПРИНЖ','09.03.04');
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gec`
--

LOCK TABLES `gec` WRITE;
/*!40000 ALTER TABLE `gec` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_comission_member`
--

LOCK TABLES `result_comission_member` WRITE;
/*!40000 ALTER TABLE `result_comission_member` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_commission secretary`
--

LOCK TABLES `result_commission secretary` WRITE;
/*!40000 ALTER TABLE `result_commission secretary` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Администратор системы'),(2,'Член комиссии'),(3,'Технический секретарь'),(4,'Секретарь комиссии');
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'admin','$2a$07$d6e52suEVjT2OngFrPPrYePm.NlxMTNR6hK0X5VZhysuAyuyfirhu',NULL,NULL);
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

-- Dump completed on 2024-05-17 16:04:33
