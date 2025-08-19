import { NewSchedule } from '../../../../shared/types';
import { getAppConfigProperty } from '../../lib/utils';
import { useCreateSchedule } from '../mutations/use-create-schedule';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const formSchema = z
  .object({
    profileId: z.uuidv4(),
    name: z.string().min(1, { message: 'Schedule name cannot be empty.' }),
    triggerDays: z
      .array(z.number().min(0).max(6))
      .min(1, { message: 'At least one trigger day must be selected.' })
      .default([getDay(new Date())])
      .nonoptional(),
    // Represents minutes since midnight (0 to 1439)
    triggerTime: z
      .number({ error: 'Trigger time is required.' })
      .int()
      .min(0, { message: 'Time cannot be before midnight (0).' })
      .max(1439, { message: 'Time cannot be after 23:59 (1439).' }),
    soundId: z.number().int().positive().optional().nullable(),
    repeat: z
      .enum(['once', 'daily', 'weekly', 'biweekly', 'monthly', 'yearly'])
      .default('once')
      .nonoptional(), // Matches DB default
    repeatStart: z.date({ error: 'A start date is required.' }),
    repeatEnd: z.date().optional().nullable(),
    isActive: z.boolean().default(true).nonoptional(), // Matches DB default
  })
  // Refinement to ensure the end date is after the start date, if provided
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

interface useCreateScheduleFormProps {
  onSubmitSuccess: (data: NewSchedule[]) => void;
  onSubmitError: (error: Error) => void;
}

export const useCreateScheduleForm = ({
  onSubmitSuccess,
  onSubmitError,
}: useCreateScheduleFormProps) => {
  const { mutate } = useCreateSchedule();
  const activeProfileId = getAppConfigProperty('activeProfileSchedule');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileId: activeProfileId,
      name: '',
      triggerDays: [getDay(new Date())],
      triggerTime: 540, // Default to 9:00 AM
      soundId: null,
      repeat: 'once',
      repeatStart: new Date(),
      repeatEnd: null,
      isActive: true,
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof formSchema>) =>
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError }),
  );

  return { form, onSubmit };
};
