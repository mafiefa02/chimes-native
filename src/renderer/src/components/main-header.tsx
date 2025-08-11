import { HomeIcon, LogInIcon } from 'lucide-react';
import { Button } from './ui/button';

export const MainHeader = () => {
  return (
    <header className="bg-zinc-50 px-6 py-2.5">
      <div className="flex items-center justify-between gap-2">
        {/* TODO: implement breadcrumb */}
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-2 text-sm"
        >
          <HomeIcon className="size-4" />
          <p>Home</p>
        </Button>
        {/* TODO: implement login action */}
        <Button
          variant="outline"
          size="sm"
        >
          <LogInIcon /> <p>Sign In</p>
        </Button>
      </div>
    </header>
  );
};
