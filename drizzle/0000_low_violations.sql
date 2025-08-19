CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`delivery_time` integer DEFAULT (current_timestamp),
	`is_read` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `notifications_user_id_idx` ON `notifications` (`user_id`);--> statement-breakpoint
CREATE INDEX `notifications_is_read_idx` ON `notifications` (`is_read`);--> statement-breakpoint
CREATE TABLE `schedule_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`schedule_id` text NOT NULL,
	`triggered_at` integer DEFAULT (current_timestamp) NOT NULL,
	`status` text DEFAULT 'triggered' NOT NULL,
	FOREIGN KEY (`schedule_id`) REFERENCES `schedules`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `schedule_history_schedule_id_idx` ON `schedule_history` (`schedule_id`);--> statement-breakpoint
CREATE INDEX `schedule_history_triggered_at_idx` ON `schedule_history` (`triggered_at`);--> statement-breakpoint
CREATE TABLE `schedule_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `schedule_profiles_user_id_idx` ON `schedule_profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `schedule_profiles_user_name_unique_idx` ON `schedule_profiles` (`user_id`,`name`);--> statement-breakpoint
CREATE TABLE `schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`name` text NOT NULL,
	`trigger_days` text DEFAULT (json_array(0, 1, 2, 3, 4, 5, 6)) NOT NULL,
	`trigger_time` text NOT NULL,
	`sound_id` integer,
	`repeat` text DEFAULT 'once' NOT NULL,
	`repeat_start` integer NOT NULL,
	`repeat_end` integer,
	`is_active` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `schedule_profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sound_id`) REFERENCES `user_sounds`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `schedules_profile_id_idx` ON `schedules` (`profile_id`);--> statement-breakpoint
CREATE INDEX `schedules_sound_id_idx` ON `schedules` (`sound_id`);--> statement-breakpoint
CREATE INDEX `schedules_active_time_idx` ON `schedules` (`is_active`,`trigger_time`);--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`avatar` text
);
--> statement-breakpoint
CREATE TABLE `user_sounds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text,
	`file_path` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_sounds_user_id_idx` ON `user_sounds` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sounds_user_name_unique_idx` ON `user_sounds` (`user_id`,`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sounds_unique_file_path_idx` ON `user_sounds` (`file_path`);