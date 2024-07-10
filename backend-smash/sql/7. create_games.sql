SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_character_id` bigint NOT NULL,
  `rate_first` DECIMAL ( 5, 2 ) NOT NULL DEFAULT 1.0,
  `second_character_id` bigint NOT NULL,
  `rate_second` DECIMAL ( 5, 2 ) NOT NULL DEFAULT 1.0,
  `third_character_id` bigint NOT NULL,
  `rate_third` DECIMAL ( 5, 2 ) NOT NULL DEFAULT 1.0,
  `fourth_character_id` bigint NOT NULL,
  `rate_fourth` DECIMAL ( 5, 2 ) NOT NULL DEFAULT 1.0,
  `stream_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` enum('pending','starting','ending') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT 'pending',
  `winner_id` bigint NULL DEFAULT NULL,
  `created_at` bigint NULL DEFAULT NULL,
  `started_at` bigint NULL DEFAULT NULL,
  `finished_at` bigint NULL DEFAULT NULL,
  `actived_at` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `first_character_id`(`first_character_id`) USING BTREE,
  INDEX `second_character_id`(`second_character_id`) USING BTREE,
  INDEX `third_character_id`(`third_character_id`) USING BTREE,
  INDEX `fourth_character_id`(`fourth_character_id`) USING BTREE,
  INDEX `winner_id`(`winner_id`) USING BTREE,
  CONSTRAINT `first_character_id_FK` FOREIGN KEY (`first_character_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fourth_character_id_FK` FOREIGN KEY (`fourth_character_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `second_character_id_FK` FOREIGN KEY (`second_character_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `third_character_id_FK` FOREIGN KEY (`third_character_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `winner_id_FK` FOREIGN KEY (`winner_id`) REFERENCES `characters` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of games
-- ----------------------------
INSERT INTO `games` VALUES (1, 1, 1, 2, 1, 3, 1, 4, 1,  'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 2, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (2, 1, 1, 2, 1, 3, 1, 4, 1,  'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 2, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (3, 2, 1, 3, 1, 4, 1, 5, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 3, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (4, 3, 1, 4, 1, 5, 1, 6, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 4, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (5, 4, 1, 5, 1, 6, 1, 7, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 5, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (6, 5, 1, 6, 1, 7, 1, 8, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 6, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (7, 6, 1, 7, 1, 8, 1, 9, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 7, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (8, 7, 1, 8, 1, 9, 1, 1, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 8, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (9, 8, 1, 9, 1, 1, 1, 2, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 9, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (10, 9, 1, 1, 1, 2, 1, 3, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 1, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (11, 1, 1, 2, 1, 3, 1, 4, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 2, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (12, 2, 1, 3, 1, 4, 1, 5, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 3, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (13, 3, 1, 4, 1, 5, 1, 6, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 4, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (14, 4, 1, 5, 1, 6, 1, 7, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 5, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (15, 5, 1, 6, 1, 7, 1, 8, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 6, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (16, 6, 1, 7, 1, 8, 1, 9, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 7, 1690303057000, 1690305057000, 1690473901675, null);
INSERT INTO `games` VALUES (17, 1, 1, 2, 1, 3, 1, 4, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'ending', 2, 1690303057000, 1690305057000, 1690365393052, null);
INSERT INTO `games` VALUES (18, 1, 1, 2, 1, 3, 1, 4, 1, 'https://www.youtube.com/watch?v=f96twbVCcHI', 'pending', NULL, 1690303057000, 1690305057000, NULL);

SET FOREIGN_KEY_CHECKS = 1;
