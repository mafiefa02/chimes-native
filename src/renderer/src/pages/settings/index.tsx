import { PageHeader } from '../../components/page-header';
import { PageHeaderLeft } from '../../components/page-header/page-header-left';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import { PageTitleTitle } from '../../components/page-title/page-title-title';

export const SettingsPage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft asChild>
          <PageTitle>
            <PageTitleTitle>Settings</PageTitleTitle>
          </PageTitle>
        </PageHeaderLeft>
      </PageHeader>
    </PageLayout>
  );
};
