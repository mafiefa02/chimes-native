import { InsetShadowCard } from '../../components/inset-shadow-card';
import { PageHeader } from '../../components/page-header';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';

export const ScheduleProfilePage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle
          title="Schedule Profile"
          description="Create a schedule to be applied each week"
        />
      </PageHeader>
      <InsetShadowCard>/schedule-profile</InsetShadowCard>
    </PageLayout>
  );
};
