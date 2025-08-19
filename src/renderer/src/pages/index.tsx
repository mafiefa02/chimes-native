import { InsetShadowCard } from '../components/inset-shadow-card';
import { PageHeader } from '../components/page-header';
import { PageLayout } from '../components/page-layout';
import { PageTitle } from '../components/page-title';
import { AddNewScheduleDialog } from '../components/pages/home/add-new-schedule-dialog';
import { ScheduleList } from '../components/pages/home/schedule-list';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

export const HomePage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle title="Today's Schedule" />
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <p>{format(new Date(), 'PPP')}</p>
            <ChevronDownIcon />
          </Button>
          <AddNewScheduleDialog />
        </div>
      </PageHeader>
      <InsetShadowCard className="overflow-y-auto">
        <ScrollArea className="h-full">
          <ScheduleList />
        </ScrollArea>
      </InsetShadowCard>
    </PageLayout>
  );
};
