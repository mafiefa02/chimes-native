import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../components/ui/popover';
import { useScheduleDate } from '../_hooks/use-schedule-date';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export const ScheduleDatePicker = () => {
  const { date, setDate } = useScheduleDate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <p>Pick a date</p>}
        </Button>
      </PopoverTrigger>
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
