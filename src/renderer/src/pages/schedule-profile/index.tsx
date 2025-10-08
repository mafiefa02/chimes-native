import { PageHeader } from '../../components/page-header';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import { PageTitleDescription } from '../../components/page-title/page-title-description';
import { PageTitleTitle } from '../../components/page-title/page-title-title';
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
        <PageTitle>
          <PageTitleTitle>Schedule Profile</PageTitleTitle>
          <PageTitleDescription>
            Create a schedule to be applied weekly
          </PageTitleDescription>
        </PageTitle>
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
          <ProfileSelector />
        </ResizablePanel>
      </ResizablePanelGroup>
    </PageLayout>
  );
};
