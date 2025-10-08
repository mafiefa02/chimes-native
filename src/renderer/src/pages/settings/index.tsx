import { PageHeader } from '../../components/page-header';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import { PageTitleTitle } from '../../components/page-title/page-title-title';

export const SettingsPage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>
          <PageTitleTitle>Settings</PageTitleTitle>
        </PageTitle>
      </PageHeader>
    </PageLayout>
  );
};
