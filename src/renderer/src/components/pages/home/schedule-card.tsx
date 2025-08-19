import { Schedule } from '../../../../../shared/types';
import { cn, minutesToTime } from '../../../lib/utils';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { EditIcon, MusicIcon, RepeatIcon } from 'lucide-react';

export interface ScheduleWithStatus extends Schedule {
  isPast: boolean;
  isUpcoming: boolean;
}

interface ScheduleCardProps {
  schedule: ScheduleWithStatus;
  onToggleActive: (
    id: Schedule['id'],
    newIsActiveValue: Schedule['isActive'],
  ) => void;
}
export const ScheduleCard = ({
  schedule,
  onToggleActive,
}: Readonly<ScheduleCardProps>) => {
  return (
    <div
      className={cn(
        'group flex h-full items-center gap-6 rounded-3xl px-9 py-5',
        schedule.isPast || (!schedule.isPast && !schedule.isActive)
          ? 'bg-zinc-100/50 text-zinc-200'
          : 'bg-zinc-100 text-primary hover:bg-zinc-200/50',
      )}
    >
      <span className="tabular-nums font-bold text-lg">
        {minutesToTime(schedule.triggerTime)}
      </span>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">{schedule.name}</span>
            {schedule.isUpcoming && (
              <Badge className="bg-primary-200 font-bold text-primary-900 text-xs">
                Upcoming
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MusicIcon size={16} />
              <span>{schedule.soundId}</span>
            </div>
            {schedule.repeat && (
              <div className="flex items-center gap-2">
                <RepeatIcon size={16} />
                <span>{schedule.repeat}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!schedule.isPast && schedule.isActive && (
            <Button
              className="hidden group-hover:inline-flex"
              size="icon"
              variant="ghost"
            >
              <EditIcon />
            </Button>
          )}
          <Switch
            checked={schedule.isActive}
            disabled={schedule.isPast}
            onCheckedChange={(value) => onToggleActive(schedule.id, value)}
          />
        </div>
      </div>
    </div>
  );
};
