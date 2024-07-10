
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`chain_id` VARCHAR ( 10 ) NOT NULL,
	`chain_name` VARCHAR ( 100 ) NOT NULL,
	`name` VARCHAR ( 200 ) NOT NULL,
	`symbol` VARCHAR ( 100 ) NOT NULL,	
	`address` VARCHAR ( 100 ) NOT NULL,	
	`created_at` BIGINT NOT NULL,
	`updated_at` BIGINT NULL DEFAULT NULL,		
	PRIMARY KEY ( `id` ) USING BTREE,
	UNIQUE INDEX `token_unique` ( `chain_name`,`address`) USING BTREE,	
	CONSTRAINT `token_chain_id_FK` FOREIGN KEY ( `chain_id` ) REFERENCES `contracts` ( `chain_id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `token_chain_name_FK` FOREIGN KEY ( `chain_name` ) REFERENCES `contracts` ( `network_name` ) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = INNODB CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

INSERT INTO `smash`.`tokens` (`id`, `chain_id`, `chain_name`, `name`, `symbol`, `address`, `created_at`, `updated_at`) VALUES (1, '0x38', 'binance-smart-chain', 'Tether', 'USDT', '0x55d398326f99059ff775485246999027b3197955', 1690299583, 1690299583);

SET FOREIGN_KEY_CHECKS = 1;
