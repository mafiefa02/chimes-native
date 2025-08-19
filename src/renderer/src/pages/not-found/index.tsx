import { PageLayout } from '../../components/page-layout';
import { buttonVariants } from '../../components/ui/button/button-variants';
import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <PageLayout className="flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-xl">Not Found!</p>
      <Link
        to="/"
        className={buttonVariants()}
      >
        Back to home
      </Link>
    </PageLayout>
  );
};
