import { Schedule } from '../../../../shared/types';
import { Switch } from '../../components/ui/switch';
import { useSchedules } from '../_hooks/use-schedules';

interface ScheduleSwitchProps {
  schedule: Schedule;
}

export const ScheduleSwitch = ({ schedule }: ScheduleSwitchProps) => {
  const { onToggle, isSchedulePast } = useSchedules();
  return (
    <Switch
      checked={schedule.isActive}
      disabled={isSchedulePast(schedule)}
      onCheckedChange={(value) => onToggle(schedule.id, value)}
    />
  );
};
