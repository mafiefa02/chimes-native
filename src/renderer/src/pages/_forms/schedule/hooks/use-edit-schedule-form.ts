import { NewSchedule, Schedule } from '../../../../../../shared/types';
import { useUpdateSchedule } from '../../../../hooks/mutations/use-update-schedule';
import { useScheduleDate } from '../../../../hooks/use-schedule-date';
import { editFormSchema, EditFormSchemaType } from '../schema';
import { formatTriggerTime } from '../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';

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
  const form = useForm<EditFormSchemaType>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      ...schedule,
      triggerTime: formatTriggerTime(schedule.triggerTime),
    },
  });

  const onSubmit = form.handleSubmit((values: EditFormSchemaType) => {
    const newValues: typeof values = {
      ...values,
      repeatStart: startOfDay(values.repeatStart),
      repeatEnd: values.repeatEnd ? endOfDay(values.repeatEnd) : undefined,
    };

    mutate(newValues, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  });

  return { form, onSubmit };
};
