import { Button } from '../../../components/ui/button';
import { ISO_DAY_OF_WEEKS } from '../../../lib/constants';
import { cn } from '../../../lib/utils';
import { useChangeDayShortcut } from '../_hooks/use-change-day-shortcut';
import { format, parse } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

interface WeeklyScheduleDaySelectorProp {
  selectedDay: number;
  setSelectedDay: Dispatch<SetStateAction<number>>;
}

export const WeeklyScheduleDaySelector = ({
  selectedDay,
  setSelectedDay,
}: WeeklyScheduleDaySelectorProp) => {
  const dayIsSelected = (day: number) => selectedDay === day;
  useChangeDayShortcut(setSelectedDay);
  return (
    <div className="@container overflow-x-auto">
      <div className="grid grid-flow-col gap-1">
        {ISO_DAY_OF_WEEKS.map((dayOfWeek) => (
          <Button
            key={`day-${dayOfWeek}`}
            variant={selectedDay === dayOfWeek ? 'default' : 'outline'}
            onClick={() => setSelectedDay(dayOfWeek)}
            size="sm"
            className={cn(
              '@lg:min-w-16 w-full rounded-lg font-semibold',
              dayIsSelected(dayOfWeek) && 'z-[1]',
            )}
          >
            <p className="@lg:hidden">
              {format(parse(dayOfWeek.toString(), 'i', new Date()), 'EEEEEE')}
            </p>
            <p className="@lg:block hidden @2xl:hidden">
              {format(parse(dayOfWeek.toString(), 'i', new Date()), 'E')}
            </p>
            <p className="@2xl:block hidden">
              {format(parse(dayOfWeek.toString(), 'i', new Date()), 'EEEE')}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};
