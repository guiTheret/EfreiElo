-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           8.0.20 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour efreielo
CREATE DATABASE IF NOT EXISTS `efreielo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `efreielo`;

-- Listage de la structure de la table efreielo. info_players
CREATE TABLE IF NOT EXISTS `info_players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_invocateur` char(50) DEFAULT NULL,info_players
  `opgg` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lvl` text,
  `elo` text,
  `icone` text,
  `accountID` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `tier` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `wins` int DEFAULT NULL,
  `lp` int DEFAULT NULL,
  `looses` int DEFAULT NULL,
  `winrate` int DEFAULT NULL,
  `rank_ok` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table efreielo.info_players : ~4 rows (environ)
/*!40000 ALTER TABLE `info_players` DISABLE KEYS */;
INSERT INTO `info_players` (`id`, `nom_invocateur`, `opgg`, `lvl`, `elo`, `icone`, `accountID`, `tier`, `wins`, `lp`, `looses`, `winrate`, `rank_ok`) VALUES
	(12, '4es Nemesis', 'undefined', '149', NULL, '50', 'V9Mo7548leNb7HLax_5ZhnmLYG08cCODjJxkWzNOBk4lHFk', 'DIAMOND', 8, 75, 8, 50, 'II'),
	(16, 'LeManguier', 'undefined', '57', NULL, '4568', 'NrD7bD_xNKogo8dfTr0ONlR__YWlSkJ71TL_0Z_Sxu5p7gm1', 'PLATINUM', 31, 35, 31, 50, 'I'),
	(17, 'ADC clash dm me', 'undefined', '432', NULL, '3456', 'yhcy4sa6rQACoh_YEhV8gnsOm8ssFTFMMQI3ilY_hJxOlMU', 'DIAMOND', 74, 6, 64, 54, 'I'),
	(18, 'Mateleo', 'undefined', '138', NULL, '21', 'w5ZVao6pYeJdorEnstV4n577f0Tjxxakd5etAWSYiq7fRyv2', 'GOLD', 26, 53, 20, 57, 'IV'),
	(19, 'Doctor weed', 'undefined', '280', NULL, '4834', 'BwA-i_Atw_4_h56Kj36fLSnAO4t6Jbm-ZqdmrHdtXQMsVGk', 'DIAMOND', 36, 43, 39, 48, 'II'),
	(20, 'Boosting4Mcdo', 'undefined', '85', NULL, '3808', 'KRiynMk_56jMDMHYQmvZhmOiU-fPs0pz2_3COmWUP4k4n6VW', 'DIAMOND', 65, 17, 53, 55, 'III'),
	(21, 'Turdyo', 'undefined', '211', NULL, '691', 'tBa5mUhsNORX6mDy92ChRnz167k5wPt3RN2xq006ksIVEbQ', 'PLATINUM', 6, 21, 6, 50, 'I'),
	(22, 'Hoosp', 'undefined', '224', NULL, '4820', '5ctwk32Lk1-iiNRo1YfcE-u7Yc2VFo0tI48XTqApDv7vkow', 'SILVER', 10, 3, 5, 67, 'II'),
	(23, '4es Cleaver', 'undefined', '239', NULL, '4061', 'aSdOpK4wwiYxKxm9llGsdfIJxSpfvkAzTj2lD-AuEeqqdw0', NULL, NULL, NULL, NULL, NULL, NULL),
	(24, 'Bluplip', 'undefined', '152', NULL, '4787', 'Meip8PEex1y488fIdp1ev71N_rOTLMLPmnYROLGuYNWzrgc', 'GOLD', 7, 75, 11, 39, 'II'),
	(25, 'u are all insane', 'undefined', '192', NULL, '29', 'BKmyTZXWDX5Tu59nCBI3VzKXyhxvWCaIX19dD9KnKlJtiwKV', 'DIAMOND', 60, 80, 55, 52, 'II'),
	(26, '4es Goop', 'undefined', '147', NULL, '6', '7m_ds8wSAmp2M-xKzbmuFaAMEttcdgvHiIqB3-TDc0rEio0', 'DIAMOND', 18, 49, 17, 51, 'I'),
	(27, '4es GROS POISSON', 'undefined', '430', NULL, '4834', 'KMHExwuGazSLPYSnt5KuUoUZx1PI4HxFgjWkfBmu25_LZ_w', 'DIAMOND', 23, 75, 31, 43, 'II');
/*!40000 ALTER TABLE `info_players` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
