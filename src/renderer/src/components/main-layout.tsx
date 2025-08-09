import { MainHeader } from './main-header';
import { MainSidebar } from './main-sidebar';

export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid h-[100dvh] grid-cols-[auto_1fr]">
      <MainSidebar />
      <div className="grid grid-rows-[auto_1fr]">
        <MainHeader />
        <main className="rounded-tl-4xl border p-5">{children}</main>
      </div>
    </div>
  );
};
