CREATE TABLE `admin` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `google_authen` tinyint(1) NOT NULL DEFAULT '0',
  `google_secret_ascii` varchar(255) DEFAULT NULL,
  `google_secret` text,
  `created_at` bigint NOT NULL,
  `updated_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `wallet_address` (`wallet_address`)
)