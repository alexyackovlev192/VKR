CREATE DATABASE  IF NOT EXISTS `newdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `newdb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: newdb
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directions`
--

LOCK TABLES `directions` WRITE;
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` VALUES (1,'ИВТ','09.03.01'),(2,'ПРИНЖ','09.03.04'),(3,'ИСТ','09.03.02'),(4,'ПИ','09.03.03'),(5,'ФИИТ','09.03.05'),(6,'АТТП','09.03.06'),(7,'Экономика','09.03.07'),(8,'БИ','09.03.08'),(9,'ПМИ','09.03.09');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Хрявин Кирилл Вадимович','4011','Разработка серверной части сервиса для сопровождения защит ВКР','Потемкина Снежана Владиславовна',4.4,NULL,'2024',1),(2,'Яковлев Александр Васильевич','4011','Разработка клиентский части сервиса для сопровождения защит ВКР','Потемкина Снежана Владиславовна',4.5,NULL,'2024',1),(3,'Егоров Андрей Дмитриевич','4011','Разработка серверной части системы управления 1','Смирнова Елена Сергеевна',4.1,NULL,'2024',1),(4,'Попова Татьяна Максимовна','4011','Создание мобильного приложения для учета финансов 2','Попова Наталья Андреевна',3.9,NULL,'2024',1),(5,'Иванов Роман Владимирович','4011','Проектирование и разработка интернет-магазина 3','Смирнова Елена Сергеевна',3.8,NULL,'2024',1),(6,'Васильева Александра Тарасовна','4011','Разработка серверной части системы управления 4','Кузнецова Мария Владимировна',4.6,NULL,'2024',1),(7,'Воробьев Владислав Николаевич','4012','Анализ данных с использованием Python 5','Попова Наталья Андреевна',4.9,NULL,'2024',1),(8,'Павлов Роман Владиславович','4012','Проектирование и разработка интернет-магазина 6','Михайлов Виктор Дмитриевич',4.8,NULL,'2024',1),(9,'Сиштова Алина Максимовна','4012','Создание мобильного приложения для учета финансов 7','Васильев Алексей Николаевич',3.5,NULL,'2024',1),(10,'Сидоров Артур Владиславович','4012','Исследование методов машинного обучения 8','Михайлов Виктор Дмитриевич',3.8,NULL,'2024',1),(11,'Титов Владимир Иванович','4012','Разработка серверной части системы управления 9','Михайлов Виктор Дмитриевич',4.1,NULL,'2024',1),(12,'Николаев Артур Андреевич','4013','Создание чат-бота для службы поддержки клиентов 10','Михайлов Виктор Дмитриевич',4.2,NULL,'2024',1),(13,'Гусев Антон Александрович','4013','Создание чат-бота для службы поддержки клиентов 11','Иванова Ольга Викторовна',4.7,NULL,'2024',1),(14,'Ромов Антон Егорович','4013','Автоматизация процессов на предприятии 12','Михайлов Виктор Дмитриевич',4.9,NULL,'2024',1),(15,'Титова Екатерина Николаевна','4051','Разработка серверной части системы управления 13','Новикова Анна Михайловна',4.2,NULL,'2024',2),(16,'Новиков Кирилл Дмитриевич','4051','Создание системы управления базами данных 14','Васильев Алексей Николаевич',4.3,NULL,'2024',2),(17,'Кузнецов Максим Михайлович','4051','Автоматизация процессов на предприятии 15','Петров Дмитрий Сергеевич',4.6,NULL,'2024',2),(18,'Аркадьев Роман Дмитриевич','4051','Анализ данных с использованием Python 16','Кузнецова Мария Владимировна',4.6,NULL,'2024',2),(19,'Кравцова Ирина Алексеевна','4051','Разработка серверной части системы управления 17','Смирнова Елена Сергеевна',4.2,NULL,'2024',2),(20,'Спирцов Максим Кириллович','4052','Разработка веб-приложения для онлайн-обучения 18','Петров Дмитрий Сергеевич',3.7,NULL,'2024',2),(21,'Лебедев Алексей Романович','4052','Создание системы управления базами данных 19','Михайлов Виктор Дмитриевич',3.7,NULL,'2024',2),(22,'Костров Иван Егорович','4052','Проектирование и разработка интернет-магазина 20','Петров Дмитрий Сергеевич',3.6,NULL,'2024',2),(23,'Огнев Дмитрий Владиславович','4052','Создание системы управления базами данных 1','Новикова Анна Михайловна',3.5,NULL,'2024',2),(24,'Шумихин Егор Максимович','4053','Разработка серверной части системы управления 2','Петров Дмитрий Сергеевич',4.7,NULL,'2024',2),(25,'Зябликов Александр Алексеевич','4053','Проектирование и разработка интернет-магазина 3','Васильев Алексей Николаевич',4.2,NULL,'2024',2),(26,'Курицын Артур Александрович','4053','Разработка серверной части системы управления 4','Сидоров Максим Александрович',4.1,NULL,'2024',2),(27,'Захарова Виктория Владимировна','4053','Разработка системы безопасности для IoT устройств 5','Михайлов Виктор Дмитриевич',4.5,NULL,'2024',2),(28,'Качин Роман Матвеевич','4053','Создание чат-бота для службы поддержки клиентов 12','Попова Наталья Андреевна',4.8,NULL,'2024',2),(29,'Синятинский Владислав Кириллович','4053','Разработка веб-приложения для онлайн-обучения 13','Иванова Ольга Викторовна',4.9,NULL,'2024',2),(30,'Дубов Дмитрий Романович','4271','Анализ данных с использованием Python 14','Попова Наталья Андреевна',4,NULL,'2024',8),(31,'Ельникова Елизавета Тимофеевна','4271','Исследование методов машинного обучения 15','Попова Наталья Андреевна',3.6,NULL,'2024',8),(32,'Угаров Андрей Артурович','4271','Разработка серверной части системы управления 16','Кузнецова Мария Владимировна',3.3,NULL,'2024',8),(33,'Епихина Алина Вадимовна','4271','Разработка веб-приложения для онлайн-обучения 17','Иванова Ольга Викторовна',3.7,NULL,'2024',8),(34,'Ершов Тимофей Николаевич','4271','Исследование методов машинного обучения 18','Петров Дмитрий Сергеевич',3.9,NULL,'2024',8),(35,'Панов Владислав Тимофеевич','4271','Разработка веб-приложения для онлайн-обучения 19','Попова Наталья Андреевна',4.1,NULL,'2024',8),(36,'Егорычева Татьяна Андреевна','4271','Разработка системы безопасности для IoT устройств 20','Михайлов Виктор Дмитриевич',4.6,NULL,'2024',8),(37,'Собакин Артур Сергеевич','4271','Создание мобильного приложения для учета финансов 21','Васильев Алексей Николаевич',4.2,NULL,'2024',8),(38,'Кошкин Алексей Дмитриевич','4272','Проектирование и разработка интернет-магазина 22','Сидоров Максим Александрович',4.9,NULL,'2024',8),(39,'Ильин Дмитрий Алексеевич','4272','Разработка клиентской части системы управления 23','Петров Дмитрий Сергеевич',4.2,NULL,'2024',8),(40,'Говоров Владислав Сергеевич','4272','Создание системы управления базами данных 24','Попова Наталья Андреевна',4.5,NULL,'2024',8),(41,'Лимонкин Илья Иванович','4272','Исследование методов машинного обучения 25','Иванова Ольга Викторовна',3.3,NULL,'2024',8),(42,'Фезеев Тимофей Егорович','4272','Разработка серверной части системы управления 26','Михайлов Виктор Дмитриевич',3.7,NULL,'2024',8),(43,'Новичкова Софья Матвеевна','4272','Создание чат-бота для службы поддержки клиентов 33','Попова Наталья Андреевна',4.7,NULL,'2024',8),(44,'Портнягин Алексей Тимофеевич','4272','Проектирование и разработка интернет-магазина 34','Петров Дмитрий Сергеевич',4.4,NULL,'2024',8),(45,'Зубов Сергей Александрович','4031','Исследование методов машинного обучения 35','Иванова Ольга Викторовна',4.3,NULL,'2024',7),(46,'Олеева Ева Андреевна','4031','Разработка клиентской части системы управления 36','Попова Наталья Андреевна',4.2,NULL,'2024',7),(47,'Усова Дарья Егоровна','4031','Создание системы управления базами данных 37','Михайлов Виктор Дмитриевич',4.8,NULL,'2024',7),(48,'Центнеров Алексей Владиславович','4031','Разработка системы безопасности для IoT устройств 38','Васильев Алексей Николаевич',4.8,NULL,'2024',7),(49,'Высокий Максим Алексеевич','4031','Создание мобильного приложения для учета финансов 39','Попова Наталья Андреевна',4.3,NULL,'2024',7),(50,'Чернов Владислав Николаевич','4031','Проектирование и разработка интернет-магазина 40','Новикова Анна Михайловна',5,NULL,'2024',7),(51,'Новыркин Алексей Алексеевич','4031','Разработка клиентской части системы управления 41','Васильев Алексей Николаевич',4.9,NULL,'2024',7),(52,'Машуева Влада Артуровна','4031','Исследование методов машинного обучения 42','Иванова Ольга Викторовна',4.1,NULL,'2024',7),(53,'Мишин Иван Сергеевич','4031','Разработка системы управления проектами','Иванов Дмитрий Сергеевич',4.3,NULL,'2024',7),(54,'Чанов Петр Владимирович','4031','Создание чат-бота для организации мероприятий','Васильев Алексей Николаевич',3.7,NULL,'2024',7),(55,'Атров Алексей Николаевич','4031','Разработка мобильного приложения для учета времени','Петров Дмитрий Сергеевич',3.5,NULL,'2024',7),(56,'Чернышов Илья Сергеевич','4031','Создание системы управления базами данных','Попова Наталья Андреевна',4.2,NULL,'2024',7),(57,'Фадеев Александр Петрович','4031','Проектирование и разработка интернет-магазина','Иванова Ольга Викторовна',4.8,NULL,'2024',7),(58,'Александрова Елена Степановна','4031','Разработка клиентской части системы управления','Михайлов Виктор Дмитриевич',4.1,NULL,'2024',7),(59,'Ждунов Артем Владиславович','4031','Создание мобильного приложения для учета финансов','Васильев Алексей Николаевич',3.5,NULL,'2024',7),(60,'Войнов Алексей Сергеевич','4071','Исследование методов машинного обучения','Иванова Ольга Викторовна',4,NULL,'2024',4),(61,'Робов Николай Иванович','4071','Разработка системы безопасности для IoT устройств','Попова Наталья Андреевна',5,NULL,'2024',4),(62,'Мадин Максим Дмитриевич','4071','Создание интернет-магазина для продажи цифровых товаров','Петров Дмитрий Сергеевич',5,NULL,'2024',4),(63,'Авшов Иван Петрович','4071','Проектирование и разработка системы управления проектами','Васильев Алексей Николаевич',4.7,NULL,'2024',4),(64,'Высоцкий Александр Сергеевич','4072','Создание чат-бота для службы технической поддержки','Попова Наталья Андреевна',4.3,NULL,'2024',4),(65,'Ежович Алина Николаевна','4072','Разработка мобильного приложения для организации встреч','Иванова Ольга Викторовна',4.5,NULL,'2024',4),(66,'Кошкина Валерия Александровна','4072','Создание системы управления базами данных для медицинских учреждений','Михайлов Виктор Дмитриевич',4,NULL,'2024',4),(67,'Лазаренко Дмитрий Сергеевич','4072','Разработка системы безопасности для банковских приложений','Васильев Алексей Николаевич',4.1,NULL,'2024',4),(68,'Вахин Петр Александрович','4073','Создание мобильного приложения для учета расходов','Попова Наталья Андреевна',4.6,NULL,'2024',4),(69,'Бахина Елизавета Сергеевна','4073','Разработка клиентской части системы управления данными','Иванова Ольга Викторовна',3.9,NULL,'2024',4),(70,'Гомулин Иван Дмитриевич','4073','Исследование методов машинного обучения для анализа данных','Петров Дмитрий Сергеевич',3.7,NULL,'2024',4),(71,'Бравов Артем Николаевич','4073','Создание системы управления задачами с использованием искусственного интеллекта','Васильев Алексей Николаевич',4,NULL,'2024',4),(72,'Жаркова Софья Александровна','4074','Разработка системы безопасности для IoT устройств','Попова Наталья Андреевна',4.6,NULL,'2024',4),(73,'Сутин Михаил Александрович','4074','Создание чат-бота для организации мероприятий','Иванова Ольга Викторовна',4.4,NULL,'2024',4),(74,'Чоботов Артем Николаевич','4074','Разработка клиентской части системы управления проектами','Петров Дмитрий Сергеевич',4.3,NULL,'2024',4),(75,'Ящиков Михаил Петрович','4181','Создание системы управления базами данных для бизнеса','Васильев Алексей Николаевич',4.1,NULL,'2024',9),(76,'Самосвалов Максим Артемович','4181','Разработка мобильного приложения для учета времени','Попова Наталья Андреевна',4.8,NULL,'2024',9),(77,'Тракторов Артем Иванович','4181','Создание интернет-магазина для продажи физических товаров','Иванова Ольга Викторовна',4.9,NULL,'2024',9),(78,'Прибудина Александра Артемовна','4181','Проектирование и разработка системы управления проектами','Петров Дмитрий Сергеевич',3.8,NULL,'2024',9),(79,'Жаль Дмитрий Петрович','4181','Разработка системы безопасности для финансовых приложений','Васильев Алексей Николаевич',3.8,NULL,'2024',9),(80,'Крутой Михаил Сергеевич','4181','Создание мобильного приложения для учета расходов','Попова Наталья Андреевна',3.9,NULL,'2024',9),(81,'Дзенев Артем Сергеевич','4181','Разработка клиентской части системы управления данными','Иванова Ольга Викторовна',4.7,NULL,'2024',9),(82,'Забитцеров Алексей Николаевич','4181','Исследование методов машинного обучения для предсказания данных','Петров Дмитрий Сергеевич',4.4,NULL,'2024',9),(83,'Набабкина Екатерина Михайловна','4182','Разработка системы для анализа спортивных данных','Потемкина Снежана Владиславовна',4.5,NULL,'2024',9),(84,'Лопатин Александр Николаевич','4182','Создание платформы для онлайн-обучения','Иванов Дмитрий Сергеевич',4.1,NULL,'2024',9),(85,'Лаптева Ирина Сергеевна','4182','Разработка системы учета и анализа финансовых операций','Васильев Алексей Николаевич',4.6,NULL,'2024',9),(86,'Шапошников Дмитрий Александрович','4182','Создание мобильного приложения для мониторинга здоровья','Петров Дмитрий Сергеевич',4.5,NULL,'2024',9),(87,'Удочкин Артем Владимирович','4182','Разработка системы управления проектами для IT-компаний','Иванова Ольга Викторовна',4.1,NULL,'2024',9),(88,'Деревяшкин Илья Сергеевич','4182','Создание чат-бота для автоматизации ответов на вопросы пользователей','Попова Наталья Андреевна',4,NULL,'2024',9),(89,'Маков Михаил Александрович','4082','Разработка системы мониторинга и анализа данных IoT-устройств','Михайлов Виктор Дмитриевич',3.4,NULL,'2024',6),(90,'Кичина Наталья Сергеевна','4015','Создание интернет-магазина для продажи одежды','Потемкина Снежана Владиславовна',3.4,NULL,'2024',6),(91,'Миранчук Алексей Михайлович','4022','Разработка системы управления задачами для удаленных команд','Иванов Дмитрий Сергеевич',3.5,NULL,'2024',6),(92,'Сербин Петр Дмитриевич','4033','Создание мобильного приложения для бронирования столов в ресторанах','Васильев Алексей Николаевич',3.8,NULL,'2024',6),(93,'Дудкин Иван Николаевич','4041','Разработка платформы для управления проектами','Петров Дмитрий Сергеевич',4,NULL,'2024',6),(94,'Хлебов Михаил Александрович','4052','Создание системы анализа данных для маркетинговых кампаний','Иванова Ольга Викторовна',4.7,NULL,'2024',6),(95,'Булкина Варвара Владимировна','4060','Разработка системы управления задачами для фрилансеров','Попова Наталья Андреевна',4.7,NULL,'2024',6),(96,'Тарелкин Дмитрий Александрович','4072','Создание мобильного приложения для учета расходов и доходов','Михайлов Виктор Дмитриевич',3.6,NULL,'2024',6),(97,'Кружкина Виктория Николаевна','4081','Разработка системы мониторинга здоровья с использованием IoT','Потемкина Снежана Владиславовна',3.9,NULL,'2024',6),(98,'Чайкин Иван Сергеевич','4014','Создание платформы для онлайн-конференций','Иванов Дмитрий Сергеевич',4.2,NULL,'2024',6),(99,'Цикорин Александр Михайлович','4020','Разработка системы управления базами данных для медицинских учреждений','Васильев Алексей Николаевич',4.4,NULL,'2024',6),(100,'Весьегонский Михаил Петрович','4030','Создание чат-бота для автоматизации клиентской поддержки','Петров Дмитрий Сергеевич',4.6,NULL,'2024',6),(101,'Лебедев Александр Владимирович','4042','Разработка мобильного приложения для управления личными финансами','Иванова Ольга Викторовна',3.8,NULL,'2024',6),(102,'Глушаков Артем Сергеевич','4053','Создание системы мониторинга и анализа данных для IoT-устройств','Васильев Алексей Николаевич',4.5,NULL,'2024',6),(103,'Головин Алексей Иванович','4013','Разработка системы анализа социальных сетей','Иванов Дмитрий Сергеевич',4.5,NULL,'2024',6),(104,'Мирова Олеся Александровна','4221','Создание платформы для онлайн-курсов','Васильев Алексей Николаевич',4.1,NULL,'2024',5),(105,'Быстров Артем Николаевич','4221','Разработка системы управления интернет-магазином','Петров Дмитрий Сергеевич',3.7,NULL,'2024',5),(106,'Журавлева Екатерина Сергеевна','4221','Создание мобильного приложения для контроля здоровья','Иванова Ольга Викторовна',3.6,NULL,'2024',5),(107,'Терзич Дмитрий Петрович','4221','Разработка системы мониторинга финансовых операций','Попова Наталья Андреевна',4.5,NULL,'2024',5),(108,'Клопова Василиса Владимировна','4221','Создание чат-бота для службы поддержки пользователей','Михайлов Виктор Дмитриевич',4,NULL,'2024',5),(109,'Радин Алексей Михайлович','4221','Разработка системы управления проектами для IT-компаний','Потемкина Снежана Владиславовна',4.6,NULL,'2024',5),(110,'Максимович Артем Николаевич','4221','Создание интернет-магазина для продажи электроники','Иванов Дмитрий Сергеевич',3.6,NULL,'2024',5),(111,'Гренков Артем Сергеевич','4221','Разработка системы управления задачами для корпоративных клиентов','Васильев Алексей Николаевич',4.6,NULL,'2024',5),(112,'Романов Дмитрий Николаевич','4222','Создание мобильного приложения для бронирования билетов','Петров Дмитрий Сергеевич',4.7,NULL,'2024',5),(113,'Созин Алексей Иванович','4222','Разработка платформы для организации онлайн-конференций','Иванова Ольга Викторовна',3.7,NULL,'2024',5),(114,'Клеенкин Михаил Николаевич','4222','Создание системы анализа данных для медицинских учреждений','Попова Наталья Андреевна',3.9,NULL,'2024',5),(115,'Понедельник Елизавета Павловна','4222','Разработка системы мониторинга и анализа данных для IoT-устройств','Михайлов Виктор Дмитриевич',4.8,NULL,'2024',5),(116,'Голдобин Дмитрий Владимирович','4222','Создание мобильного приложения для учета времени','Потемкина Снежана Владиславовна',4.7,NULL,'2024',5),(117,'Субботин Артем Сергеевич','4222','Разработка системы управления интернет-магазином для малого бизнеса','Иванов Дмитрий Сергеевич',3.9,NULL,'2024',5),(118,'Шоготов Артем Николаевич','4222','Создание платформы для онлайн-обучения школьников','Васильев Алексей Николаевич',4.2,NULL,'2024',5),(119,'Суликина Ольга Петровна','4281','Разработка системы управления базами данных для образовательных учреждений','Петров Дмитрий Сергеевич',3.9,NULL,'2024',3),(120,'Матвеев Иван Александрович','4281','Создание чат-бота для автоматизации процесса найма','Иванова Ольга Викторовна',4,NULL,'2024',3),(121,'Кулагин Алексей Николаевич','4281','Разработка системы мониторинга здоровья с использованием IoT','Попова Наталья Андреевна',3,NULL,'2024',3),(122,'Держов Дмитрий Сергеевич','4281','Создание платформы для организации спортивных мероприятий','Михайлов Виктор Дмитриевич',3.1,NULL,'2024',3),(123,'Богдина Алиса Николаевна','4281','Разработка системы управления задачами для фрилансеров','Потемкина Снежана Владиславовна',4.7,NULL,'2024',3),(124,'Сувилинкин Михаил Николаевич','4281','Создание интернет-магазина для продажи цифровых товаров','Иванов Дмитрий Сергеевич',4.3,NULL,'2024',3),(125,'Ломаев Александр Владимирович','4281','Разработка системы управления проектами для крупных компаний','Васильев Алексей Николаевич',4.5,NULL,'2024',3),(126,'Колбаскин Дмитрий Петрович','4282','Создание мобильного приложения для контроля за физической активностью','Петров Дмитрий Сергеевич',4.6,NULL,'2024',3),(127,'Ножкин Иван Николаевич','4282','Разработка системы анализа данных для маркетинговых исследований','Иванова Ольга Викторовна',4.7,NULL,'2024',3),(128,'Ябедов Александр Дмитриевич','4282','Создание платформы для онлайн-обучения взрослых','Попова Наталья Андреевна',3.5,NULL,'2024',3),(129,'Выдин Михаил Артемович','4282','Разработка системы управления проектами для среднего бизнеса','Михайлов Виктор Дмитриевич',3.8,NULL,'2024',3),(130,'Эктов Петр Артемович','4282','Создание мобильного приложения для учета расходов','Потемкина Снежана Владиславовна',4.4,NULL,'2024',3),(131,'Симоненко Иван Александрович','4282','Разработка системы управления интернет-магазином для крупных компаний','Иванов Дмитрий Сергеевич',4.7,NULL,'2024',3),(132,'Рыбкин Дмитрий Михайлович','4282','Создание чат-бота для автоматизации внутренних процессов компании','Васильев Алексей Николаевич',3.9,NULL,'2024',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,1),(2,2,3),(3,2,4),(4,3,2),(5,4,2),(6,5,2),(7,6,2),(8,7,4),(9,8,2),(10,9,2),(11,10,4),(12,11,2),(13,12,2),(14,13,2),(15,14,2),(16,15,2),(17,16,4),(18,17,4),(19,18,2),(20,19,2),(21,20,2),(22,21,2),(23,22,2),(24,23,2),(25,23,4),(26,24,2),(27,25,2),(28,26,2),(29,27,2),(30,28,4),(31,29,2),(32,30,2),(33,31,2),(34,32,2),(35,33,2),(36,34,4),(37,35,2),(38,36,2),(39,37,2),(40,38,2),(41,39,2),(42,40,2),(43,40,4),(44,41,2),(45,42,2),(46,43,2),(47,44,2),(48,45,2),(49,46,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'admin','$2a$07$d6e52suEVjT2OngFrPPrYePm.NlxMTNR6hK0X5VZhysuAyuyfirhu',NULL,NULL),(2,'Махалкина Татьяна Олеговна','MTO.24','$2a$07$tgEN5e7VUiBQfG8YHXttX.VOaX1Srif.Vw51t6cSWyXYHUGOkImN.','mahalkina236@uni-dubna.ru','старший преподаватель'),(3,'Черемисина Евгения Наумовна','CEN.24','$2a$07$53u0oY9s4bqGM8dtXlobaesE6vXS43xKh6Ih04NF9yxA55zUdmQKG','Cheremisina_E@uni-dubna.ru','профессор'),(4,'Добрынин Владимир Николаевич','DVN.24','$2a$07$2yakgm.c2HNFbFsPLZoWXelUDC2MMXGN8y3Cy5DrA1QqFBitla77e','Dobrynin_V@uni-dubna.ru','профессор'),(5,'Аверкин Алексей Николаевич','AAN.24','$2a$07$6CEF.zKy/ekGJV9lEdRuaeVfkx06/LYaJ/tZMZwjAdt/101.LDA7W','Averkin_A@uni-dubna.ru','доцент'),(6,'Бородин Владимир Алексеевич','BVA.24','$2a$07$OOGxO0wZeWo3k.tyDLMsOeOPQCQBjeSq33ClyqcUDbHfMJ8H73QEi','Borodin_V@uni-dubna.ru','профессор'),(7,'Балашова Марина Владимировна','BMV.24','$2a$07$WdVe/MhJ6FAizJ4IphM1FeJGcxAzTVFcvMRFy5hFfEpyFmw/xFsbm','Balashova_M@uni-dubna.ru','старший преподаватель'),(8,'Любимова Анна Владимировна','LAV.24','$2a$07$9LA7abeK7g/KamnyciLbVuOJtgBWV.z2aMJwsLQ6xth5Y8WGfNyjS','Lyubimova_A@uni-dubna.ru','доцент'),(9,'Пряхин Вадим Николаевич','PVN.24','$2a$07$PD8M1Rm0apVfNp9RjAgj4uTwtJan.CTdwfhZNeM4ZwjUxzrLZmZlu','Pryakhin_V@uni-dubna.ru','профессор'),(10,'Горюнова Екатерина Александровна','GEA.24','$2a$07$bYSpi3nrX4y68Wjtucpd0.aFGWXa4WLEjIVlw/Y6bF44AjsI6QoxO','Goryunova_E@uni-dubna.ru','ассистент'),(11,'Белов Михаил Александрович','BMA.24','$2a$07$mr.IXDQVbmpG7/XIm0PKFOvmWMRUllFsPMhmQW4wCVDhIlPAhWsNe','Belov_M@uni-dubna.ru','доцент'),(12,'Сычев Петр Павлович','SPP.24','$2a$07$0a9W60sz3omS1lTbXCvMH.xLqc0uagGcKXVpHtaMwH.XZniUB87eC','Sychyov_P@uni-dubna.ru','доцент'),(13,'Дедович Татьяна Григорьевна','DTG.24','$2a$07$SZ/sdvODujocFGw/5svxJ.00jZH5D9dr/a/VqwHgofEe.zXMNARQq','Dedovich_T@uni-dubna.ru','доцент'),(14,'Никонов Эдуард Германович','NEG.24','$2a$07$rFxH2Xuunmlud0gbtbwMlOS1VVyWk1R6bmX1NLriPLMfkpM3fyptO','Nikonov_E@uni-dubna.ru','профессор'),(15,'Аверичев Георгий Станиславович','AGS.24','$2a$07$9yUQHnFpPoQy1Min8vKpreBWdtFCAsGTcVERRaHhyAlhouf6LvA6m','Averichev_G@uni-dubna.ru','доцент'),(16,'Беднякова Татьяна Михайловна','BTM.24','$2a$07$S6TtLN2wv3/U8e8y9hF7c.1tgXwYcwl1Ula7ZDuEN3yb7ZoSKNzRS','Bednyakova_T@uni-dubna.ru','старший преподаватель'),(17,'Бархатова Ирина Александровна','BIA.24','$2a$07$vKx840xPO12P2n2XoEL7quNBiIXeJxbAFFYQYTi6jz9wCfOzCq9Mq','Barkhatova_I@uni-dubna.ru','старший преподаватель'),(18,'Тятюшкина Ольга Юрьевна','TOY.24','$2a$07$jGp0uceHgde6ySXdN7VLw.5OmYCavp11y7xMtrUZe.FXU1Wq89GE.','Tyatyushkina_O@uni-dubna.ru','доцент'),(19,'Мурадян Арутюн Ваникович','MAV.24','$2a$07$RnXl1F8lVk.Yds2M1TfJluYVbCGHkK9MWC6RlVke9OmvUpOFX1nyS','Muradyan_A@uni-dubna.ru','доцент'),(20,'Потемкина Снежана Владиславовна','PSV.24','$2a$07$w3EqjjUaNsYFUJNwl2xO6.WPybTZz6lX8lVAbtF5vSg5px57VvOn6','Potemkina_S@uni-dubna.ru','доцент'),(21,'Лишилин Михаил Владимирович','LMV.24','$2a$07$6myk2ALP0EX15BKB4XH/1ux6pVmdpzGsOm3NFqix0ecYJVSuxqUGe','Lishilin_M@uni-dubna.ru','доцент'),(22,'Тюпикова Татьяна Викторовна','TTV.24','$2a$07$Dv9Y1WIoKwKPFKZZWbuJAuFzOLteBHEon8SG8VXar8CrmJiGCQvnO','Tyupikova_T@uni-dubna.ru','доцент'),(23,'Думбрайс Крыстына Ольгертовна','DKO.24','$2a$07$DDaGcY3VhPlHIgZ0OIAfBO8bCvF2OHiIe.DWP5MXT/Us1pBWvKw4a','Dumbrais_K@uni-dubna.ru','доцент'),(24,'Минзов Анатолий Степанович','MAS.24','$2a$07$FsrbT.AR9wgEkfivfPIsP.qY0EZAnUU2gr4mxVEZL4PHzkZIzq7oi','Minzov_A@uni-dubna.ru','профессор'),(25,'Крюков Юрий Алексеевич','KYA.24','$2a$07$QR7AdXXmoIk1lEckvggMuOPMxZTx2tsxjfTF4W2NGA4MD9cqLM02q','Kryukov_Y@uni-dubna.ru','доцент'),(26,'Прогулова Татьяна Борисовна','PTB.24','$2a$07$btzu1QD2EL6Xwtuy4IKto.H9xuXZPAhzerWC7nDV54uPIfqxnuegG','Progulova_T@uni-dubna.ru','доцент'),(27,'Сидорова Ольга Викторовна','SOV.24','$2a$07$qVxHJZ1O1I/NleGE5bYeWenewx9gWxd4X.wWze7lHIioRW5OdNzTm','Sidorova_O@uni-dubna.ru','доцент'),(28,'Немчанинова София Вадимовна','NSV.24','$2a$07$5GQ3YoQoDCk3Nz6dtQQ0hOLLE/BL6zbMNHiy/kBNt5IN5xYyVnf1C','Nemchaninova_S@uni-dubna.ru','старший преподаватель'),(29,'Кореньков Владимир Васильевич','KVV.24','$2a$07$a4/oEq0eY/FmaoKpBOkRBOZUkqqJwlz//OnCXMYRFyN6es5Ea0Iku','Korenkov_V@uni-dubna.ru','профессор'),(30,'Лукьянов Константин Валерьевич','LKV.24','$2a$07$sAjY.YykXXq9mYO/X.BesONDn7SEp1tl.OEHUCmo7xwTmThFOZVcC','Lukyanov_K@uni-dubna.ru','доцент'),(31,'Задорожный Александр Михайлович','ZAM.24','$2a$07$kZqPLtoCuPeCQilyp/il3eSDbNgQ5YIk.WSJKEk.qZKEaDpezRzJO','Zadorozhnyy_A@uni-dubna.ru','доцент'),(32,'Земляная Елена Валерьевна','ZEV.24','$2a$07$cok7k0iohRmRjBXEufsKVOcFVWS1uR30C4J4M/ydURa46Ue.ZUUPC','Zemlyanaya_E@uni-dubna.ru','профессор'),(33,'Мельникова Ольга Игоревна','MOI.24','$2a$07$E232/pGW42YUhRx8smPcXO4m/oabhlf./e9MZ7ki341Ov5V4N3MPm','Melnikova_O@uni-dubna.ru','доцент'),(34,'Ушанкова Мария Юрьевна','UMY.24','$2a$07$Xi3/sdK7AxSovVgiokxs/uqM44LrNB3qUWJeSJdioVgT1tIdfqqlO','Ushankova_M@uni-dubna.ru','старший преподаватель'),(35,'Ершов Николай Михайлович','ENM.24','$2a$07$hA13TxwX8BuntRM/oNKI/eba1N9aaMy1xoijwG/D00Zvg1e8v3dre','Ershov_N@uni-dubna.ru','доцент'),(36,'Михайлов Игорь Ефимович','MIE.24','$2a$07$sXT4Hs9UwTb3UIlKZ59.wOcwDl3zH0FyRbsTVWoHhTncVphti6ktG','Mikhaylov_I@uni-dubna.ru','профессор'),(37,'Кирпичева Елена Юрьевна','KEY.24','$2a$07$VtfG0ou9fwWo1ykIAKcwr.x9rRublHSaRtx4UfkH30/ZPjn8GdrMm','Kirpicheva_E@uni-dubna.ru','доцент'),(38,'Стрельцова Оксана Ивановна','SOI.24','$2a$07$7J3inGGdohb/vnD9C2d9Zu.f.cR9.8NdAGIl0RynR.1.EEuCiRz96','Streltsova_O@uni-dubna.ru','доцент'),(39,'Токарева Надежда Александровна','TNA.24','$2a$07$8UM.452HD17DfhFDP3b2qucxiZ4Nn559hW9engQqzi5GqqJegE4Q6','Tokareva_N@uni-dubna.ru','доцент'),(40,'Крейдер Оксана Александровна','KOA.24','$2a$07$URrJAjwBuLWt8P54JZxs2.IysKXFl3EszCUKqkOYRnt93RUgCveZO','Kreyder_O@uni-dubna.ru','доцент'),(41,'Петров Валерий Александрович','PVA.24','$2a$07$fMXqRBCoI5vvA1yloN3QTed3lPrE2RonOCYehFSxvO41ybHprnVee','Petrov_V@uni-dubna.ru','доцент'),(42,'Горбунов Николай Васильевич','GNV.24','$2a$07$qzOp.uWeE41Zzcc9JtXDreyV1pHb0/EGCSdUlR4BggcdkRbPxwAXm','Gorbunov_N@uni-dubna.ru','доцент'),(43,'Бугров Алексей Николаевич','BAN.24','$2a$07$K6hOF6AF4KNIODW7.vyL1uD0SWmIDDErDZZ7CUn313uZECHvg5mFe','Bugrov_A@uni-dubna.ru','доцент'),(44,'Сеннер Александр Евгеньевич','SAE.24','$2a$07$MQ7uJcuA2aLHDz5FVM4Tt.cDWKHShCA8M5h3aV6knfiwuLy7Q11H6','Sennar_A@uni-dubna.ru','доцент'),(45,'Куликов Дмитрий Леонидович','KDL.24','$2a$07$An.0QGWsCq0yF1idQTMFOeYOgx0B2HgK0GkeNmJM3Vx/Nwd58r3m6','Kulikov_D@uni-dubna.ru','доцент'),(46,'Распопова Юлия Николаевна','RYN.24','$2a$07$AzevHVfqd9nkHXohyviTIOHHzL4/GY1p4eA8CH6qCvfm2xJQoWOAm','Raspopova_Y@uni-dubna.ru','старший преподаватель');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'newdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03  3:10:03
