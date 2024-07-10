
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`wallet_address` VARCHAR ( 200 ) NOT NULL,	
	`referral_code` VARCHAR ( 10 ) NOT NULL,
	`created_at` BIGINT NOT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,		
	PRIMARY KEY ( `id` ) USING BTREE,
	UNIQUE INDEX `wallet_address` ( `wallet_address`) USING BTREE,
	UNIQUE INDEX `referral_code` ( `referral_code`) USING BTREE
) ENGINE = INNODB CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
