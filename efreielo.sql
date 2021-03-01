-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.9-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for efreielo
CREATE DATABASE IF NOT EXISTS `robebou_efrei_elo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `robebou_efrei_elo`;

-- Dumping structure for table efreielo.info_players
CREATE TABLE IF NOT EXISTS `info_players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_invocateur` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `lvl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `elo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `icone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `accountID` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tier` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `wins` int(11) DEFAULT NULL,
  `lp` int(11) DEFAULT NULL,
  `looses` int(11) DEFAULT NULL,
  `winrate` int(11) DEFAULT NULL,
  `rank_ok` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `validated` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table efreielo.info_players: ~8 rows (approximately)
/*!40000 ALTER TABLE `info_players` DISABLE KEYS */;
REPLACE INTO `info_players` (`id`, `nom_invocateur`, `lvl`, `elo`, `icone`, `accountID`, `tier`, `wins`, `lp`, `looses`, `winrate`, `rank_ok`, `validated`) VALUES
	(36, 'elecsat', '249', '249', '3366', 'Nkpue2S9fjYDMvQ2hvyhFGdz9ZkMPzIRQBfDVF2r-mxygRA', 'GOLD', 30, 39, 31, 49, 'II', 1),
	(38, '4es Némésis', '220', '220', '1211', 'u4j6pp59AJeZG1CfMLN35mClMAeU1zwwcD9pf_L8Wplwi-Y', 'MASTER', 39, 84, 32, 55, 'I', 1),
	(39, 'LoulouLaZoulette', '278', '277', '539', '5DOwhcdkLotRmCOmlwUH3nKMmrbCEInKPjbIjTm7uBxErII', 'MASTER', 136, 1, 114, 54, 'I', 1),
	(40, '4es Goop', '149', '149', '6', 'wBk-2p5eCjYBZSbB082ud2DxqrcHwxuhaT7ptR68MezoQKU', 'DIAMOND', 26, 0, 27, 49, 'I', 1),
	(41, 'Manguier', '166', '166', '4497', '8jf46wKRF49U_DogoQSIecn6O3yqAxWyYYt_1VZ4rCmcULQ', 'PLATINUM', 18, 94, 18, 50, 'I', 1),
	(42, 'Mouameme', '335', '335', '4217', 'r0hGhpJTEvmTyDkCCHrVnVabmrxciTQ6qy-jjjQl4Cb1D0E', 'PLATINUM', 20, 58, 21, 49, 'II', 1),
	(43, 'Zeussky', '40', NULL, '7', 'lMwC0qf6l4jIhiRzt2ivRUg3FBc22GXfKFLT1Avzc98UrxQ', NULL, NULL, NULL, NULL, NULL, NULL, 1),
	(44, 'SALUT', '47', NULL, '3887', '7cGLIdaW5krRJWBBzwJo6XPkrnPUQfb-DRcPHybrjqKhP7o', NULL, NULL, NULL, NULL, NULL, NULL, 1),
	(46, '4es Nemesis', '154', NULL, '50', 'ziDdtvFQWkAPOrGwGummdd5Ot23athFC_srrFacB4wCGtPo', 'MASTER', 39, 58, 35, 53, 'I', 1);
/*!40000 ALTER TABLE `info_players` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
