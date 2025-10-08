import { cn } from '../../lib/utils';

type PageTitleProps = React.ComponentPropsWithRef<'div'>;

export const PageTitle = (props: PageTitleProps) => {
  return (
    <div
      className={cn('flex flex-col gap-0', props.className)}
      {...props}
    />
  );
};
