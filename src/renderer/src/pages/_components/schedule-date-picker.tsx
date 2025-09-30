import { KbdIndicator } from '../../components/kbd-indicator';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import { useIsMac } from '../../hooks/use-is-mac';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export const ScheduleDatePicker = () => {
  const { date, setDate } = useScheduleDate();
  const isMac = useIsMac();
  return (
    <Popover>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground justify-start text-left font-normal"
            >
              <CalendarIcon />
              {date ? format(date, 'PPP') : <p>Pick a date</p>}{' '}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1.5">
          <p>Use</p>
          <KbdIndicator className="inline-flex h-fit bg-transparent text-white border-1">
            {isMac ? '⌘' : 'Ctrl'} + ←
          </KbdIndicator>{' '}
          <p>or </p>
          <KbdIndicator className="inline-flex h-fit bg-transparent text-white border-1">
            {isMac ? '⌘' : 'Ctrl'} + →
          </KbdIndicator>{' '}
          <p>to change date.</p>
        </TooltipContent>
      </Tooltip>
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
