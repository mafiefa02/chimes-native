import { PageHeader } from '../../components/page-header';
import { PageHeaderLeft } from '../../components/page-header/page-header-left';
import { PageHeaderRight } from '../../components/page-header/page-header-right';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import { PageTitleDescription } from '../../components/page-title/page-title-description';
import { PageTitleTitle } from '../../components/page-title/page-title-title';
import { ProfileSelectorDropdown } from './_components/profile-selector-dropdown';
import { WeeklySchedule } from './_components/weekly-schedule';

export const ScheduleProfilePage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>
            <PageTitleTitle>Schedule Profile</PageTitleTitle>
            <PageTitleDescription>
              Create a schedule to be applied weekly
            </PageTitleDescription>
          </PageTitle>
        </PageHeaderLeft>
        <PageHeaderRight>
          <ProfileSelectorDropdown />
        </PageHeaderRight>
      </PageHeader>
      <WeeklySchedule />
    </PageLayout>
  );
};
