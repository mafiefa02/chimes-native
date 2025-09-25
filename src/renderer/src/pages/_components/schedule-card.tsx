import { Schedule } from '../../../../shared/types';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { Switch } from '../../components/ui/switch';
import { useGetSoundById } from '../../hooks/queries/use-get-sound-by-id';
import {
  cn,
  formatDateToLocalTimezone,
  parseDateStringAsUTC,
} from '../../lib/utils';
import { DeleteScheduleDialog } from './delete-schedule-dialog';
import { EditScheduleDialog } from './edit-schedule-dialog';
import { EditIcon, MusicIcon, RepeatIcon, TrashIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

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
  const { data: sound, isPending, isError } = useGetSoundById(schedule.soundId);
  const soundDataIsAvailable = sound && !isPending && !isError;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        'group flex h-full items-center gap-6 rounded-3xl px-9 py-5',
        schedule.isPast || (!schedule.isPast && !schedule.isActive)
          ? 'bg-card/20 text-card-foreground/20 border'
          : 'bg-card border text-card-foreground',
      )}
    >
      <span className="tabular-nums font-bold text-lg">
        {formatDateToLocalTimezone(
          parseDateStringAsUTC(schedule.triggerTime, 'HH:mm'),
          'HH:mm',
        )}
      </span>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">{schedule.name}</span>
            <AnimatePresence initial={false}>
              {schedule.isUpcoming && (
                <motion.span
                  key={schedule.id}
                  initial={{ x: 20, opacity: 0 }}
                  exit={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'backInOut' }}
                >
                  <Badge className="bg-primary font-bold text-primary-foreground text-xs">
                    Upcoming
                  </Badge>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MusicIcon size={16} />
              <span>
                {soundDataIsAvailable ? (
                  sound.name
                ) : (
                  <Skeleton className="h-4 w-16" />
                )}
              </span>
            </div>
            {schedule.repeat && (
              <div className="flex items-center gap-2">
                <RepeatIcon size={16} />
                <span className="capitalize">{schedule.repeat}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!schedule.isPast && schedule.isActive && (
            <>
              <Button
                className="hidden group-hover:inline-flex"
                size="icon"
                variant="ghost"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <EditIcon />
              </Button>
              <Button
                className="hidden group-hover:inline-flex"
                size="icon"
                variant="ghost"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <TrashIcon />
              </Button>
              <DeleteScheduleDialog
                schedule={schedule}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
              />
              <EditScheduleDialog
                schedule={schedule}
                isDialogOpen={isEditDialogOpen}
                setIsDialogOpen={setIsEditDialogOpen}
              />
            </>
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
