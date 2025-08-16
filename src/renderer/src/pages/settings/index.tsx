import { PageHeader } from '@/components/page-header';
import { PageLayout } from '@/components/page-layout';
import { PageTitle } from '@/components/page-title';

export const SettingsPage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle title="Settings" />
      </PageHeader>
    </PageLayout>
  );
};
