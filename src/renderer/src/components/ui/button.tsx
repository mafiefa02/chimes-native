import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { type VariantProps } from 'class-variance-authority';

import { cn, buttonVariants } from '@renderer/lib/utils';

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
