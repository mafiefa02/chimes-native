import { cn } from '../lib/utils';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { SidebarProvider } from './sidebar/contexts/sidebar-context';
import { Outlet } from 'react-router';

interface MainLayoutProps {
  className?: string;
}

export const MainLayout = ({ className }: Readonly<MainLayoutProps>) => {
  return (
    <div className="grid h-[100dvh] grid-cols-[auto_1fr] bg-zinc-50">
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <div className="grid grid-rows-[auto_1fr]">
        <Header />
        <main
          className={cn(
            'rounded-tl-4xl border bg-white py-8 px-10 inset-shadow-primary-50 inset-shadow-sm',
            className,
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
