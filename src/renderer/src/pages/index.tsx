import { InsetShadowCard } from '../components/inset-shadow-card';
import { PageHeader } from '../components/page-header';
import { PageTitle } from '../components/page-title';
import { Button } from '../components/ui/button';
import { PageLayout } from '@/components/page-layout';
import { format } from 'date-fns';
import { ChevronDownIcon, PlusIcon } from 'lucide-react';

export const HomePage = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle title="Today's Schedule" />
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <p>{format(new Date(), 'PPP')}</p>
            <ChevronDownIcon />
          </Button>
          <Button>
            <PlusIcon />
            <p>Add New</p>
          </Button>
        </div>
      </PageHeader>
      <InsetShadowCard>/</InsetShadowCard>
    </PageLayout>
  );
};
