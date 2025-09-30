import { Schedule } from '../../../../../shared/types';
import { format } from 'date-fns';

interface WeeklyScheduleCardInformationsProps {
  schedule: Schedule;
}

export const WeeklyScheduleCardInformations = ({
  schedule,
}: WeeklyScheduleCardInformationsProps) => {
  const dateFormat = 'PP';
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      {format(schedule.repeatStart, dateFormat)}
      {schedule.repeatEnd && ` - ${format(schedule.repeatEnd, dateFormat)}`}
    </div>
  );
};
