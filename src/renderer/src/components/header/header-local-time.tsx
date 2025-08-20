import { useTime } from '../../hooks/use-time';
import { format } from 'date-fns';
import { ClockIcon } from 'lucide-react';

export const HeaderLocalTime = () => {
  const { time } = useTime();
  return (
    <div className="flex items-center gap-2">
      <ClockIcon className="size-4" />
      <p className="tabular-nums font-semibold text-sm">
        {time ? format(time, 'HH:mm:ss') : '--:--:--'}
      </p>
    </div>
  );
};
