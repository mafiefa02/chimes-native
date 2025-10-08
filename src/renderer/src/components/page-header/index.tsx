import { cn } from '../../lib/utils';

type PageHeaderProps = React.ComponentPropsWithRef<'div'>;

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <div
      {...props}
      className={cn('flex gap-4 w-full', props.className)}
    />
  );
};
