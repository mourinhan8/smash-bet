
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE
IF
	EXISTS `bet_history`;
CREATE TABLE `bet_history` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`user_id` BIGINT NOT NULL,
	`wallet_id` BIGINT NOT NULL,	
	`token_id` BIGINT NOT NULL,	
	`amount` DECIMAL ( 24, 10 ) NOT NULL,
	`game_id` BIGINT NOT NULL,
	`character_id` BIGINT NOT NULL,	
	`created_at` BIGINT NULL DEFAULT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) USING BTREE,		
	INDEX `user_id` ( `user_id`) USING BTREE,
	INDEX `wallet_id` ( `wallet_id`) USING BTREE,
	INDEX `token_id` ( `token_id`) USING BTREE,
	INDEX `character_id` ( `character_id`) USING BTREE,
	INDEX `game_id` ( `game_id`) USING BTREE,
	CONSTRAINT `bet_user_id_FK` FOREIGN KEY ( `user_id` ) REFERENCES `users` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `bet_wallet_id_FK` FOREIGN KEY ( `wallet_id` ) REFERENCES `wallets` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `bet_token_id_FK` FOREIGN KEY ( `token_id` ) REFERENCES `tokens` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `bet_character_id_FK` FOREIGN KEY ( `character_id` ) REFERENCES `characters` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `game_id_FK` FOREIGN KEY ( `game_id` ) REFERENCES `games` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = INNODB AUTO_INCREMENT = 1 CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;