import { cn } from '../../lib/utils';
import * as React from 'react';

interface ExtendedInputProps extends React.ComponentProps<'input'> {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

function Input({
  className,
  type,
  leftAdornment,
  rightAdornment,
  ...props
}: ExtendedInputProps) {
  return (
    <div className="relative w-full min-w-0">
      {leftAdornment && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          {leftAdornment}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          { 'pl-9': leftAdornment, 'pr-9': rightAdornment },
          className,
        )}
        {...props}
      />
      {rightAdornment && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightAdornment}
        </span>
      )}
    </div>
  );
}

export { Input };
