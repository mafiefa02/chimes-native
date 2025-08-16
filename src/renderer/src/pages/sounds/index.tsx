import { InsetShadowCard } from '../../components/inset-shadow-card';
import { PageHeader } from '../../components/page-header';
import { PageLayout } from '../../components/page-layout';
import { PageTitle } from '../../components/page-title';

export const SoundsPage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle title="Sounds" />
      </PageHeader>
      <InsetShadowCard>/sounds</InsetShadowCard>
    </PageLayout>
  );
};
