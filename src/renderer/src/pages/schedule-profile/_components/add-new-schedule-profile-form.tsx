import { ScheduleProfile } from '../../../../../shared/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { useCreateScheduleProfile } from '../../../hooks/mutations/use-create-schedule-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const addNewScheduleProfileSchema = z.object({
  name: z.string().min(1, 'Profile name cannot be empty'),
});

type AddNewScheduleProfileFormValues = z.infer<
  typeof addNewScheduleProfileSchema
>;

interface AddNewScheduleProfileFormProps {
  onSuccess: (profile: ScheduleProfile) => void;
  formAction: ReactNode;
}

export const AddNewScheduleProfileForm = ({
  onSuccess,
  formAction,
}: AddNewScheduleProfileFormProps) => {
  const { mutateAsync: createProfile } = useCreateScheduleProfile();

  const form = useForm<AddNewScheduleProfileFormValues>({
    resolver: zodResolver(addNewScheduleProfileSchema),
    defaultValues: { name: '' },
  });

  const handleSubmit = form.handleSubmit(
    async (values: AddNewScheduleProfileFormValues) => {
      await createProfile(
        { name: values.name },
        {
          onSuccess: (profile) => {
            toast.success('New schedule profile created');
            onSuccess(profile[0]);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Work Week"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formAction}
      </form>
    </Form>
  );
};
