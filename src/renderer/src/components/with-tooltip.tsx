import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

interface WithTooltipProps
  extends React.ComponentProps<typeof TooltipPrimitive.Root> {
  tooltipContent: React.ReactNode;
}

export const WithTooltip = ({
  tooltipContent,
  children,
  ...props
}: WithTooltipProps) => {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
};
