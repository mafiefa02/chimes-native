import { PageTitle } from '../../components/page-title';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { format } from 'date-fns';

export const NameOfDayTitle = () => {
  const { date } = useScheduleDate();
  const nameOfDay = format(date, 'EEEE');
  return (
    <div className="flex items-center gap-2">
      <PageTitle title={`${nameOfDay}'s`} />
      <p className="text-lg">Daily Schedule</p>
    </div>
  );
};
