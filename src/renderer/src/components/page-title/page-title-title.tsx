import { cn } from '../../lib/utils';
import { Slot as SlotPrimitive } from 'radix-ui';

interface PageTitleTitleProps extends React.ComponentPropsWithRef<'h1'> {
  asChild?: boolean;
}

export const PageTitleTitle = (props: PageTitleTitleProps) => {
  const Comp = props.asChild ? SlotPrimitive.Slot : 'h1';
  return (
    <Comp
      {...props}
      className={cn('text-xl font-bold', props.className)}
    />
  );
};
