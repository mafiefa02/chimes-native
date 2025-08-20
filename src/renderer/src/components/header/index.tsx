import { HeaderBreadcrumbs } from './header-breadcrumbs';
import { HeaderLocalTime } from './header-local-time';
import { HTMLProps } from 'react';

interface HeaderProps extends HTMLProps<HTMLElement> {}

export const Header = ({ ref, ...props }: HeaderProps) => {
  return (
    <header
      {...props}
      ref={ref}
      className="bg-zinc-50 px-10 py-2.5"
    >
      <div className="flex items-center justify-between gap-2">
        <HeaderBreadcrumbs />
        <HeaderLocalTime />
      </div>
    </header>
  );
};
