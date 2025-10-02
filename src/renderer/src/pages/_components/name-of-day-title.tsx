import { PageTitle } from '../../components/page-title';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { format, isToday } from 'date-fns';

export const NameOfDayTitle = () => {
  const { date } = useScheduleDate();
  const nameOfDay = isToday(date) ? 'Today' : format(date, 'EEEE');
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-2">
        <PageTitle title={`${nameOfDay}'s`} />
        <p className="text-lg">Schedule</p>
      </div>
      <p className="text-sm">{format(date, 'PPP')}</p>
    </div>
  );
};
