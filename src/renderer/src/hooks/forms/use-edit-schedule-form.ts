import { NewSchedule, Schedule } from '../../../../shared/types';
import { useScheduleDate } from '../../components/pages/home/hooks/use-schedule-date';
import {
  formatDateToLocalTimezone,
  parseDateStringAsUTC,
} from '../../lib/utils';
import { useUpdateSchedule } from '../mutations/use-update-schedule';
import { formSchema } from './use-create-schedule-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import z from 'zod';

const editFormSchema = formSchema.extend({ id: z.uuid() });

interface useEditScheduleFormProps {
  schedule: Schedule;
  onSubmitSuccess: (data: NewSchedule[]) => void;
  onSubmitError: (error: Error) => void;
}

export const useEditScheduleForm = ({
  schedule,
  onSubmitSuccess,
  onSubmitError,
}: useEditScheduleFormProps) => {
  const { date } = useScheduleDate();
  const { mutate } = useUpdateSchedule(date);
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      ...schedule,
      triggerDays: schedule.triggerDays ?? [getDay(date)],
      triggerTime: formatDateToLocalTimezone(
        parseDateStringAsUTC(schedule.triggerTime, 'HH:mm'),
        'HH:mm',
      ),
    },
  });

  const onSubmit = form.handleSubmit((values: z.infer<typeof editFormSchema>) =>
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError }),
  );

  return { form, onSubmit };
};
