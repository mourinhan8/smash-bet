
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for characters
-- ----------------------------
DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `former` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `win` bigint NOT NULL DEFAULT 0,
  `lost` bigint NOT NULL DEFAULT 0,
  `created_at` bigint NULL DEFAULT NULL,
  `updated_at` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of characters
-- ----------------------------
INSERT INTO `characters` VALUES (1, 'AI Level 1', 'Adam', 'https://randomwordgenerator.com/img/picture-generator/5ee6dc434950b10ff3d8992cc12c30771037dbf85254784b732f7ad0914e_640.jpg', 5, 10, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (2, 'AI Level 2', 'Eva', 'https://randompicturegenerator.com/img/dog-generator/g539ae210bd3e949419aa040aaa6fd2da4ee25579484d57d7f9aa2b0a3fd63ed323311b8ff8983e329081ecf73219fcf0_640.jpg', 6, 9, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (3, 'AI Level 3', 'Bros', 'https://randompicturegenerator.com/img/dog-generator/gcee2e73f916e6aa361918c3c6a55609daf1cc11a2cac8ea9639b9d31c4530508857b4aa8a4d71154a827dfae4e5dffb5_640.jpg', 7, 8, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (4, 'AI Level 4', 'Black', 'https://randompicturegenerator.com/img/dog-generator/g9b34a7ccab676b1ea6ebf5fda6c66997ea3318cbe6f7ed68fc62bd7db00bad5e0883dc2792ed6330ee08c15e307c031a_640.jpg', 8, 7, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (5, 'AI Level 5', 'Sys', 'https://randompicturegenerator.com/img/dog-generator/ge1d887b8844da8b668d202169c9363aec200df9093fa2f2667bfce0f821f75e52bb8f7df4baddb55757786c24f647c7c_640.jpg', 9, 6, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (6, 'AI Level 6', 'Ruel', 'https://randompicturegenerator.com/img/dog-generator/gaada29cd5474a32b12b4c19a718272f4a109a4bd68e637fde7c78e69d9079d6de30ffb77c83c3f12f95aa58901e1f853_640.jpg', 10, 5, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (7, 'AI Level 7', 'Ian', 'https://randompicturegenerator.com/img/dog-generator/g446bd15f34f6fcb35272fa878493a90e9600b73e57f1f1dbca68ac22b9a1f780cb58c8a940d5727f930aa78d7b537b82_640.jpg', 11, 4, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (8, 'AI Level 8', 'Tylor', 'https://randompicturegenerator.com/img/dog-generator/gb066a2042cffd0262bd779a54f67ea2f585951e7ca67f0846441c2e9abfc293a197518673ce1e6d1027484890d704476_640.jpg', 12, 3, 1690303057, 1690303057);
INSERT INTO `characters` VALUES (9, 'AI Level 9', 'Jack', 'https://randompicturegenerator.com/img/dog-generator/g913a2b6f81253654df3b9e66abc189e6b966daf7a7a37b814b2336ab4459a832db90c8b923a5a8e28e63bb2fdd4496e1_640.jpg', 13, 3, 1690303057, 1690303057);

SET FOREIGN_KEY_CHECKS = 1;
