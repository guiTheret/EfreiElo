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
  `nom_invocateur` char(50) DEFAULT NULL,
  `opgg` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lvl` text,
  `elo` text,
  `icone` text,
  `accountID` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table efreielo.info_players : ~0 rows (environ)
/*!40000 ALTER TABLE `info_players` DISABLE KEYS */;
INSERT INTO `info_players` (`id`, `nom_invocateur`, `opgg`, `lvl`, `elo`, `icone`, `accountID`) VALUES
	(3, 'Le Manguier', 'undefined', '57', NULL, '4568', 'NrD7bD_xNKogo8dfTr0ONlR__YWlSkJ71TL_0Z_Sxu5p7gm1'),
	(4, 'Manguier', 'undefined', '162', NULL, '4497', 'FdwUm7dw_W7a-pFBaCyMa16xxNmm6YDgQJCPa5bCv9gMwBU'),
	(5, 'GodRobert', 'undefined', '115', NULL, '924', 'qHWiEXWd1PJgLS3XVsYagetvUCt_xPNXJX8dgfTmvSLW0qk'),
	(6, 'ADC clash dm me', 'undefined', '432', NULL, '3456', 'yhcy4sa6rQACoh_YEhV8gnsOm8ssFTFMMQI3ilY_hJxOlMU'),
	(7, 'Boosting4mcdo', 'undefined', '85', NULL, '3808', 'KRiynMk_56jMDMHYQmvZhmOiU-fPs0pz2_3COmWUP4k4n6VW'),
	(8, 'Zeussky', 'undefined', '40', NULL, '7', '0e30n_-1a0wAEmtp9hiQfeMrA2e4hJpGOA8giwA--jOR3yM'),
	(9, '4es Cleaver', 'undefined', '239', NULL, '4061', 'aSdOpK4wwiYxKxm9llGsdfIJxSpfvkAzTj2lD-AuEeqqdw0'),
	(10, 'LoulouLazoulette', 'undefined', '267', NULL, '539', 'MlGt8ax6pBFlDzHz7mdQG4a_cGKaordlLOBu2EviUosOQJI');
/*!40000 ALTER TABLE `info_players` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;