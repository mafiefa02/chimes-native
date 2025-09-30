import { Schedule } from '../../../shared/types';
import { useGetSoundById } from '../hooks/queries/use-get-sound-by-id';
import { Skeleton } from './ui/skeleton';
import { MusicIcon } from 'lucide-react';

interface ScheduleMusicInformationProps {
  schedule: Schedule;
}

export const ScheduleMusicInformation = ({
  schedule,
}: ScheduleMusicInformationProps) => {
  const { data: sound, isPending, isError } = useGetSoundById(schedule.soundId);
  if (isError || !sound) return;
  return (
    <div className="flex items-center gap-2">
      <MusicIcon size={16} />
      <span>{!isPending ? sound.name : <Skeleton className="h-4 w-16" />}</span>
    </div>
  );
};
