import { Schedule } from '../../../shared/types';
import { RepeatIcon } from 'lucide-react';

interface ScheduleRepeatInformationProps {
  schedule: Schedule;
}

export const ScheduleRepeatInformation = ({
  schedule,
}: ScheduleRepeatInformationProps) => {
  if (!schedule.repeat) return;
  return (
    <div className="flex items-center gap-2">
      <RepeatIcon size={16} />
      <span className="capitalize">{schedule.repeat}</span>
    </div>
  );
};
