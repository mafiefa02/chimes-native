import { cn } from '../../lib/utils';
import { Slot as SlotPrimitive } from 'radix-ui';

interface PageHeaderRightProps extends React.ComponentPropsWithRef<'div'> {
  asChild?: boolean;
}

export const PageHeaderRight = (props: PageHeaderRightProps) => {
  const Comp = props.asChild ? SlotPrimitive.Slot : 'div';
  return (
    <Comp
      {...props}
      className={cn('ml-auto', props.className)}
    />
  );
};
