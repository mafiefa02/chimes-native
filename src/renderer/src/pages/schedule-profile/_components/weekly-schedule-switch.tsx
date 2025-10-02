import { Schedule } from '../../../../../shared/types';
import { Switch } from '../../../components/ui/switch';
import { useUpdateSchedule } from '../../../hooks/mutations/use-update-schedule';

interface WeeklyScheduleSwitchProps {
  schedule: Schedule;
}

export const WeeklyScheduleSwitch = ({
  schedule,
}: WeeklyScheduleSwitchProps) => {
  const { mutate: updateSchedule } = useUpdateSchedule();
  return (
    <Switch
      checked={schedule.isActive}
      onCheckedChange={(value) =>
        updateSchedule({ id: schedule.id, isActive: value })
      }
    />
  );
};
