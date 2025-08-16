import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

export const userProfiles = sqliteTable('user_profiles', {
  id: text('id')
    .$default(() => uuidv4())
    .primaryKey(),
  displayName: text('display_name').notNull(),
  avatar: text('avatar'),
});

export const scheduleProfiles = sqliteTable(
  'schedule_profiles',
  {
    id: text('id')
      .$default(() => uuidv4())
      .primaryKey(),
    userId: text('user_id')
      .references(() => userProfiles.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    timezone: text('timezone').notNull().default('UTC'), // IANA timezone name (ex. 'Asia/Jakarta')
  },
  (table) => [
    index('schedule_profiles_user_id_idx').on(table.userId),
    uniqueIndex('schedule_profiles_user_name_unique_idx').on(
      table.userId,
      table.name,
    ),
  ],
);

export const userSounds = sqliteTable(
  'user_sounds',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id')
      .references(() => userProfiles.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name'),
    filePath: text('file_path').notNull(),
  },
  (table) => [
    index('user_sounds_user_id_idx').on(table.userId),
    uniqueIndex('user_sounds_user_name_unique_idx').on(
      table.userId,
      table.name,
    ),
    uniqueIndex('user_sounds_unique_file_path_idx').on(table.filePath),
  ],
);

export const schedules = sqliteTable(
  'schedules',
  {
    id: text('id')
      .$default(() => uuidv4())
      .primaryKey(),
    profileId: text('profile_id')
      .references(() => scheduleProfiles.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    triggerDays: text('trigger_days', { mode: 'json' })
      .notNull()
      .$type<number[]>()
      .default(sql`(json_array(0, 1, 2, 3, 4, 5, 6))`),
    triggerTime: integer('trigger_time').notNull(), // Stores minutes since midnight
    soundId: integer('sound_id').references(() => userSounds.id, {
      onDelete: 'set null',
    }),
    repeat: text('repeat', {
      enum: ['once', 'weekly', 'biweekly', 'monthly', 'yearly'],
    })
      .notNull()
      .default('once'),
    repeatStart: integer('repeat_start', { mode: 'timestamp' }).notNull(),
    repeatEnd: integer('repeat_end', { mode: 'timestamp' }),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
  },
  (table) => [
    index('schedules_profile_id_idx').on(table.profileId),
    index('schedules_sound_id_idx').on(table.soundId),
    index('schedules_active_time_idx').on(table.isActive, table.triggerTime),
  ],
);

export const scheduleHistory = sqliteTable(
  'schedule_history',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    scheduleId: text('schedule_id')
      .references(() => schedules.id, { onDelete: 'cascade' })
      .notNull(),
    triggeredAt: integer('triggered_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(current_timestamp)`),
    status: text('status', { enum: ['triggered', 'missed', 'dismissed'] })
      .notNull()
      .default('triggered'),
  },
  (table) => [
    index('schedule_history_schedule_id_idx').on(table.scheduleId),
    index('schedule_history_triggered_at_idx').on(table.triggeredAt),
  ],
);

export const notifications = sqliteTable(
  'notifications',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id')
      .references(() => userProfiles.id, { onDelete: 'cascade' })
      .notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    deliveryTime: integer('delivery_time', { mode: 'timestamp' }).default(
      sql`(current_timestamp)`,
    ),
    isRead: integer('is_read', { mode: 'boolean' }).default(false),
  },
  (table) => [
    index('notifications_user_id_idx').on(table.userId),
    index('notifications_is_read_idx').on(table.isRead),
  ],
);
