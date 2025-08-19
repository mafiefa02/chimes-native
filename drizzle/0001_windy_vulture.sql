PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`name` text NOT NULL,
	`trigger_days` text DEFAULT (json_array(0, 1, 2, 3, 4, 5, 6)) NOT NULL,
	`trigger_time` integer NOT NULL,
	`sound_id` integer,
	`repeat` text DEFAULT 'once' NOT NULL,
	`repeat_start` integer NOT NULL,
	`repeat_end` integer,
	`is_active` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `schedule_profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sound_id`) REFERENCES `user_sounds`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_schedules`("id", "profile_id", "name", "trigger_days", "trigger_time", "sound_id", "repeat", "repeat_start", "repeat_end", "is_active") SELECT "id", "profile_id", "name", "trigger_days", "trigger_time", "sound_id", "repeat", "repeat_start", "repeat_end", "is_active" FROM `schedules`;--> statement-breakpoint
DROP TABLE `schedules`;--> statement-breakpoint
ALTER TABLE `__new_schedules` RENAME TO `schedules`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `schedules_profile_id_idx` ON `schedules` (`profile_id`);--> statement-breakpoint
CREATE INDEX `schedules_sound_id_idx` ON `schedules` (`sound_id`);--> statement-breakpoint
CREATE INDEX `schedules_active_time_idx` ON `schedules` (`is_active`,`trigger_time`);