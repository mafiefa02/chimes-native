import { cn } from '../../lib/utils';
import { Slot as SlotPrimitive } from 'radix-ui';

interface PageHeaderLeftProps extends React.ComponentPropsWithRef<'div'> {
  asChild?: boolean;
}

export const PageHeaderLeft = (props: PageHeaderLeftProps) => {
  const Comp = props.asChild ? SlotPrimitive.Slot : 'div';
  return (
    <Comp
      {...props}
      className={cn('self-start', props.className)}
    />
  );
};
