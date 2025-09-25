import { NewSchedule } from '../../../../../../shared/types';
import { useCreateSchedule } from '../../../../hooks/mutations/use-create-schedule';
import { useScheduleDate } from '../../../../hooks/use-schedule-date';
import { getAppConfigProperty } from '../../../../lib/utils';
import { createFormSchema, type CreateFormSchemaType } from '../schema';
import { validateTriggerDays } from '../utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDay } from 'date-fns';
import { useForm } from 'react-hook-form';

interface useCreateScheduleFormProps {
  onSubmitSuccess: (data: NewSchedule[]) => void;
  onSubmitError: (error: Error) => void;
}

export const useCreateScheduleForm = ({
  onSubmitSuccess,
  onSubmitError,
}: useCreateScheduleFormProps) => {
  const { date } = useScheduleDate();
  const { mutate } = useCreateSchedule(date);
  const activeProfileId = getAppConfigProperty('activeProfileSchedule');
  const form = useForm<CreateFormSchemaType>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      profileId: activeProfileId,
      name: '',
      triggerDays: [getDay(date ?? new Date())],
      triggerTime: '09:00',
      soundId: undefined,
      repeat: 'once',
      repeatStart: date,
      repeatEnd: null,
      isActive: true,
    },
  });

  const onSubmit = form.handleSubmit((values: CreateFormSchemaType) => {
    const newValues: typeof values = {
      ...values,
      triggerDays: validateTriggerDays({
        repeat: values.repeat,
        repeatStart: values.repeatStart,
      }),
    };
    mutate(newValues, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  });

  return { form, onSubmit };
};
