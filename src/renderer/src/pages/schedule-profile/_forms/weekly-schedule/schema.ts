import { z } from 'zod';

const weeklyScheduleBaseSchema = z
  .object({
    profileId: z.uuidv4().optional(),
    name: z.string().min(1, { message: 'Schedule name cannot be empty.' }),
    triggerDays: z
      .array(z.number().min(1).max(7))
      .min(1, 'At least one day is required'),
    triggerTime: z
      .string({ error: 'Required' })
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format.',
      }),
    soundId: z.number({ message: 'Required' }).int().positive(),
    repeat: z.enum(['once', 'daily', 'weekly']).default('weekly').nonoptional(),
    repeatStart: z.date({ error: 'A start date is required.' }),
    repeatEnd: z.date().optional().nullable(),
    isActive: z.boolean().default(true).nonoptional(),
  })
  .refine(
    (data) => (data.repeatEnd ? data.repeatEnd > data.repeatStart : true),
    {
      message: 'The end date must be after the start date.',
      path: ['repeatEnd'],
    },
  );

export const createWeeklyScheduleFormSchema = weeklyScheduleBaseSchema;
export const editWeeklyScheduleFormSchema = weeklyScheduleBaseSchema.extend({
  id: z.uuidv4(),
});

export type EditWeeklyScheduleFormSchemaType = z.infer<
  typeof editWeeklyScheduleFormSchema
>;
export type CreateWeeklyScheduleFormSchemaType = z.infer<
  typeof createWeeklyScheduleFormSchema
>;
