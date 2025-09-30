import { InsetShadowCard } from '../../components/inset-shadow-card';
import { PageHeader } from '../../components/page-header';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../components/ui/resizable';
import { ProfileSelector } from './_components/profile-selector';
import { WeeklySchedule } from './_components/weekly-schedule';

export const ScheduleProfilePage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle
          title="Schedule Profile"
          description="Create a schedule to be applied weekly"
        />
      </PageHeader>
      <ResizablePanelGroup
        className="size-full"
        direction="horizontal"
      >
        <ResizablePanel minSize={60}>
          <WeeklySchedule />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="mx-3"
        />
        <ResizablePanel
          defaultSize={25}
          minSize={25}
        >
          <InsetShadowCard className="size-full">
            <ProfileSelector />
          </InsetShadowCard>
        </ResizablePanel>
      </ResizablePanelGroup>
    </PageLayout>
  );
};
