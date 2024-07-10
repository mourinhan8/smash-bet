SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE
IF
	EXISTS `withdraw_request`;
CREATE TABLE `withdraw_request` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`user_id` BIGINT NOT NULL,
	`token_id` BIGINT NOT NULL,
	`transaction_id` BIGINT NOT NULL,
	`amount` DECIMAL ( 24, 10 ) NOT NULL,
	`fee` DECIMAL ( 24, 10 ) NOT NULL,
	`admin_check`  ENUM('approved','rejected','pending') NULL DEFAULT 'pending',
	`bot_execute_status`  ENUM('ignore','pending','executing','success','fail') NULL DEFAULT 'ignore',
	`bot_comment`  VARCHAR(200) NULL DEFAULT NULL,
	`tx_hash` VARCHAR(200) NULL DEFAULT NULL,
	`created_at` BIGINT NOT NULL,
	`resolved_at` BIGINT NULL DEFAULT NULL,
	`executed_at` BIGINT NULL DEFAULT NULL,
	`finished_at` BIGINT NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) USING BTREE,		
	INDEX `user_id` ( `user_id`) USING BTREE,
	INDEX `token_id` ( `token_id`) USING BTREE,
	CONSTRAINT `withdraw_request_user_id_FK` FOREIGN KEY ( `user_id` ) REFERENCES `users` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `withdraw_request_token_id_FK` FOREIGN KEY ( `token_id` ) REFERENCES `tokens` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `withdraw_request_transaction_id_FK` FOREIGN KEY ( `transaction_id` ) REFERENCES `transactions` ( `id` ) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = INNODB AUTO_INCREMENT = 1 CHARACTER 
SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;