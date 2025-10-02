import { Schedule } from '../../../../../../../shared/types';
import { useUpdateSchedule } from '../../../../../hooks/mutations/use-update-schedule';
import { formatTriggerTime } from '../../../../_forms/schedule/utils';
import {
  editWeeklyScheduleFormSchema,
  EditWeeklyScheduleFormSchemaType,
} from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';

interface useEditWeeklyScheduleFormProps {
  schedule: Schedule;
  onSubmitSuccess: (data: EditWeeklyScheduleFormSchemaType[]) => void;
  onSubmitError: (error: Error) => void;
}

export const useEditWeeklyScheduleForm = ({
  schedule,
  onSubmitSuccess,
  onSubmitError,
}: useEditWeeklyScheduleFormProps) => {
  const { mutate: updateSchedule } = useUpdateSchedule();

  const form = useForm<EditWeeklyScheduleFormSchemaType>({
    resolver: zodResolver(editWeeklyScheduleFormSchema),
    defaultValues: {
      ...schedule,
      triggerTime: formatTriggerTime(schedule.triggerTime),
      repeatStart: new Date(schedule.repeatStart),
      repeatEnd: schedule.repeatEnd ? new Date(schedule.repeatEnd) : null,
    },
  });

  const onSubmit = form.handleSubmit(
    (values: EditWeeklyScheduleFormSchemaType) => {
      const newValues = {
        ...values,
        repeatStart: startOfDay(values.repeatStart),
        repeatEnd: values.repeatEnd ? endOfDay(values.repeatEnd) : undefined,
      };
      updateSchedule(newValues, {
        onSuccess: () => onSubmitSuccess([newValues]),
        onError: onSubmitError,
      });
    },
  );

  return { form, onSubmit };
};
