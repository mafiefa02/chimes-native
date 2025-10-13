import { InsetShadowCard } from '../../components/inset-shadow-card';
import { PageHeader } from '../../components/page-header';
import { PageHeaderLeft } from '../../components/page-header/page-header-left';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import { PageTitleTitle } from '../../components/page-title/page-title-title';

export const SoundsPage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>
            <PageTitleTitle>Sounds</PageTitleTitle>
          </PageTitle>
        </PageHeaderLeft>
      </PageHeader>
      <InsetShadowCard>/sounds</InsetShadowCard>
    </PageLayout>
  );
};
