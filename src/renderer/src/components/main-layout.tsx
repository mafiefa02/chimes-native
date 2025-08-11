import { MainHeader } from './main-header';
import { Sidebar } from './sidebar';
import { SidebarProvider } from './sidebar/contexts/sidebar-context';

export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid h-[100dvh] grid-cols-[auto_1fr] bg-zinc-50">
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <div className="grid grid-rows-[auto_1fr]">
        <MainHeader />
        <main className="rounded-tl-4xl border bg-white p-6">{children}</main>
      </div>
    </div>
  );
};
