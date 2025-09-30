import { InsetShadowCard } from '../components/inset-shadow-card';
import { PageHeader } from '../components/page-header';
import { PageLayout } from '../components/page-layout';
import { ScheduleDateProvider } from '../contexts/schedule-date-provider';
import { AddNewScheduleDialog } from './_components/add-new-schedule-dialog';
import { NameOfDayTitle } from './_components/name-of-day-title';
import { ScheduleDatePicker } from './_components/schedule-date-picker';
import { ScheduleList } from './_components/schedule-list';

export const HomePage = () => {
  return (
    <ScheduleDateProvider>
      <PageLayout>
        <PageHeader>
          <NameOfDayTitle />
          <div className="flex items-center gap-4">
            <ScheduleDatePicker />
            <AddNewScheduleDialog />
          </div>
        </PageHeader>
        <InsetShadowCard className="overflow-y-auto no-scrollbar">
          <ScheduleList />
        </InsetShadowCard>
      </PageLayout>
    </ScheduleDateProvider>
  );
};
