import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../components/ui/popover';
import { WithTooltip } from '../../components/with-tooltip';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { ScheduleDatePickerTooltip } from './schedule-date-picker-tooltip';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export const ScheduleDatePicker = () => {
  const { date, setDate } = useScheduleDate();
  return (
    <Popover>
      <WithTooltip tooltipContent={<ScheduleDatePickerTooltip />}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
          >
            <CalendarIcon />
            {date ? format(date, 'PPP') : <p>Pick a date</p>}
          </Button>
        </PopoverTrigger>
      </WithTooltip>
      <PopoverContent className="w-auto p-0">
        <Calendar
          required
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
};
