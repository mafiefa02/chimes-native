PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_sounds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`file_path` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_sounds`("id", "user_id", "name", "file_path") SELECT "id", "user_id", "name", "file_path" FROM `user_sounds`;--> statement-breakpoint
DROP TABLE `user_sounds`;--> statement-breakpoint
ALTER TABLE `__new_user_sounds` RENAME TO `user_sounds`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `user_sounds_user_id_idx` ON `user_sounds` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sounds_user_name_unique_idx` ON `user_sounds` (`user_id`,`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sounds_unique_file_path_idx` ON `user_sounds` (`file_path`);