import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { type VariantProps } from 'class-variance-authority';

import { badgeVariants, cn } from '@renderer/lib/utils';

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
