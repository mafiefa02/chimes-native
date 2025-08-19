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
    triggerTime: z
      .string({ error: 'Trigger time is required.' })
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid time format. Please use HH:mm.',
      }),
    soundId: z.number({ message: 'Sound is required.' }).int().positive(),
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
      triggerTime: '09:00',
      soundId: undefined,
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
