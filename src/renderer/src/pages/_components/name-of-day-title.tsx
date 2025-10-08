import { PageTitle } from '../../components/page-title';
import { PageTitleDescription } from '../../components/page-title/page-title-description';
import { PageTitleTitle } from '../../components/page-title/page-title-title';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { format, isToday } from 'date-fns';

export const NameOfDayTitle = () => {
  const { date } = useScheduleDate();
  const nameOfDay = isToday(date) ? 'Today' : format(date, 'EEEE');
  return (
    <PageTitle>
      <PageTitleTitle>
        {nameOfDay}&apos;s <span className="font-normal">Schedule</span>
      </PageTitleTitle>
      <PageTitleDescription>{format(date, 'PPP')}</PageTitleDescription>
    </PageTitle>
  );
};
