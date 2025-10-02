import { Schedule } from '../../../../../shared/types';
import { Button } from '../../../components/ui/button';
import { Calendar } from '../../../components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '../../../components/ui/toggle-group';
import { useGetSounds } from '../../../hooks/queries/use-get-sounds';
import { ISO_DAY_OF_WEEKS } from '../../../lib/constants';
import { cn, getDayName } from '../../../lib/utils';
import { useEditWeeklyScheduleForm } from '../_forms/weekly-schedule/hooks/use-edit-weekly-schedule-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface EditWeeklyScheduleFormProps {
  formAction: ReactNode;
  closeDialog: () => void;
  schedule: Schedule;
}

export const EditWeeklyScheduleForm = ({
  formAction,
  closeDialog,
  schedule,
}: EditWeeklyScheduleFormProps) => {
  const { form, onSubmit } = useEditWeeklyScheduleForm({
    schedule,
    onSubmitSuccess: (values) => {
      closeDialog();
      toast.success('Schedule saved!', {
        closeButton: true,
        description: `The schedule "${values[0].name}" has been successfully updated.`,
      });
    },
    onSubmitError: (error) =>
      toast.error('Failed to save schedule!', { description: error.message }),
  });

  const { data: sounds, isPending, isError } = useGetSounds();
  const soundsAreAvailable = !isPending && !isError;
  const { setValue, watch, resetField } = form;
  const repeat = watch('repeat');
  const triggerDays = watch('triggerDays');

  useEffect(() => {
    if (triggerDays.length === ISO_DAY_OF_WEEKS.length) {
      setValue('repeat', 'daily', { shouldValidate: true });
    }
  }, [triggerDays, setValue, resetField]);

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <div className="space-y-4 max-h-[60dvh] overflow-y-auto px-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Morning bells"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="triggerTime"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Trigger Time</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="time"
                      value={field.value}
                      className="w-full"
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soundId"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Notification Sound</FormLabel>
                    <FormMessage />
                  </div>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value ? parseInt(value) : null)
                    }
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a sound" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Sounds</SelectLabel>
                        {soundsAreAvailable
                          ? sounds.map((sound) => (
                              <SelectItem
                                key={sound.id}
                                value={sound.id.toString()}
                              >
                                {sound.name}
                              </SelectItem>
                            ))
                          : null}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="repeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a repeat frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {repeat === 'weekly' && (
            <FormField
              control={form.control}
              name="triggerDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trigger on</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      value={field.value.map(String)}
                      onValueChange={(value) => {
                        const numericValues = value
                          .map(Number)
                          .filter((v) => !isNaN(v) && v > 0);
                        field.onChange(numericValues);
                      }}
                      className="grid grid-cols-7 w-full border"
                    >
                      {ISO_DAY_OF_WEEKS.map((day) => (
                        <ToggleGroupItem
                          key={`${day}-day-of-weeks`}
                          value={day.toString()}
                          className="w-full"
                        >
                          {getDayName(day, 'EEE')}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {repeat && (
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <FormField
                control={form.control}
                name="repeatStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start repeating on</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End repeating on</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        {formAction}
      </form>
    </Form>
  );
};
