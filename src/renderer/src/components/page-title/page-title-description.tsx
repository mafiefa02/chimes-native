import { cn } from '../../lib/utils';
import { Slot as SlotPrimitive } from 'radix-ui';

interface PageTitleDescriptionProps extends React.ComponentPropsWithRef<'p'> {
  asChild?: boolean;
}

export const PageTitleDescription = (props: PageTitleDescriptionProps) => {
  const Comp = props.asChild ? SlotPrimitive.Slot : 'p';
  return (
    <Comp
      {...props}
      className={cn('text-sm', props.className)}
    />
  );
};
