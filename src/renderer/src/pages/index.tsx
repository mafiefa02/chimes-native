import { InsetShadowCard } from '../components/inset-shadow-card';
import { PageHeader } from '../components/page-header';
import { PageLayout } from '../components/page-layout';
import { PageTitle } from '../components/page-title';
import { AddNewScheduleDialog } from '../components/pages/home/add-new-schedule-dialog';
import { ScheduleDateProvider } from '../components/pages/home/contexts/schedule-date-provider';
import { ScheduleDatePicker } from '../components/pages/home/schedule-date-picker';
import { ScheduleList } from '../components/pages/home/schedule-list';

export const HomePage = () => {
  return (
    <ScheduleDateProvider>
      <PageLayout>
        <PageHeader>
          <PageTitle title="Daily Schedule" />
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
