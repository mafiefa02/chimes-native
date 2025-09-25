import { z } from 'zod';

const scheduleBaseSchema = z
  .object({
    profileId: z.uuidv4(),
    name: z.string().min(1, { message: 'Schedule name cannot be empty.' }),
    triggerDays: z.array(z.number().min(0).max(6)).nonoptional(),
    triggerTime: z
      .string({ error: 'Required' })
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format.',
      }),
    soundId: z.number({ message: 'Required' }).int().positive(),
    repeat: z
      .enum(['once', 'daily', 'weekly', 'biweekly', 'monthly', 'yearly'])
      .default('once')
      .nonoptional(), // Matches DB default
    repeatStart: z.date({ error: 'A start date is required.' }),
    repeatEnd: z.date().optional().nullable(),
    isActive: z.boolean().default(true).nonoptional(), // Matches DB default
  }) // Refinement to ensure the end date is after the start date, if provided
  .refine(
    (data) => {
      if (data.repeatEnd && data.repeatStart) {
        return data.repeatEnd > data.repeatStart;
      }
      return true; // No end date, so validation passes
    },
    {
      message: 'The end date must be after the start date.',
      path: ['repeatEnd'], // Specify which form field this error applies to
    },
  );

export const createFormSchema = scheduleBaseSchema;
export const editFormSchema = scheduleBaseSchema.extend({ id: z.uuid() });

export type CreateFormSchemaType = z.infer<typeof createFormSchema>;
export type EditFormSchemaType = z.infer<typeof editFormSchema>;
