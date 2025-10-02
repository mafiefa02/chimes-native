import { NewSchedule } from '../../../../../../../shared/types';
import { useCreateSchedule } from '../../../../../hooks/mutations/use-create-schedule';
import { useAppConfig } from '../../../../../hooks/use-app-config';
import { ISO_DAY_OF_WEEKS } from '../../../../../lib/constants';
import {
  createWeeklyScheduleFormSchema,
  type CreateWeeklyScheduleFormSchemaType,
} from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';

interface useCreateWeeklyScheduleFormProps {
  selectedDay: number;
  onSubmitSuccess: (data: NewSchedule[]) => void;
  onSubmitError: (error: Error) => void;
}

export const useCreateWeeklyScheduleForm = ({
  selectedDay,
  onSubmitSuccess,
  onSubmitError,
}: useCreateWeeklyScheduleFormProps) => {
  const { mutate } = useCreateSchedule();
  const profileId = useAppConfig('activeProfileSchedule');
  const form = useForm<CreateWeeklyScheduleFormSchemaType>({
    resolver: zodResolver(createWeeklyScheduleFormSchema),
    defaultValues: {
      profileId,
      name: '',
      triggerDays: [selectedDay],
      triggerTime: '09:00',
      soundId: undefined,
      repeat: 'weekly',
      repeatStart: new Date(),
      repeatEnd: null,
      isActive: true,
    },
  });

  const onSubmit = form.handleSubmit(
    (values: CreateWeeklyScheduleFormSchemaType) => {
      const newValues: typeof values = {
        ...values,
        profileId,
        repeatStart: startOfDay(values.repeatStart),
        repeatEnd: values.repeatEnd ? endOfDay(values.repeatEnd) : undefined,
        triggerDays:
          values.repeat === 'daily' ? ISO_DAY_OF_WEEKS : values.triggerDays,
      };
      mutate(newValues, { onSuccess: onSubmitSuccess, onError: onSubmitError });
    },
  );

  return { form, onSubmit };
};
