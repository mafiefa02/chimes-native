import { InsetShadowCard } from '../../components/inset-shadow-card';
import { PageHeader } from '../../components/page-header';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';
import { PageTitleTitle } from '../../components/page-title/page-title-title';

export const SoundsPage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>
          <PageTitleTitle>Sounds</PageTitleTitle>
        </PageTitle>
      </PageHeader>
      <InsetShadowCard>/sounds</InsetShadowCard>
    </PageLayout>
  );
};
