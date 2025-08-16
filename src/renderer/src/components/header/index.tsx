import { Button } from '../ui/button';
import { HeaderBreadcrumbs } from './header-breadcrumbs';
import { LogInIcon } from 'lucide-react';

/** TODO: implement login action */
export const Header = () => {
  return (
    <header className="bg-zinc-50 px-10 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <HeaderBreadcrumbs />
        <Button
          variant="outline"
          size="sm"
        >
          <LogInIcon />
          <p>Sign In</p>
        </Button>
      </div>
    </header>
  );
};
