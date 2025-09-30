import { Schedule } from '../../../../shared/types';
import { useSchedules } from '../_hooks/use-schedules';
import { ScheduleDeleteAction } from './schedule-delete-action';
import { ScheduleEditAction } from './schedule-edit-action';
import { ScheduleSwitch } from './schedule-switch';

interface ScheduleActionsProps {
  schedule: Schedule;
  isVisible: boolean;
}

export const ScheduleActions = ({
  schedule,
  isVisible,
}: ScheduleActionsProps) => {
  const { isSchedulePast } = useSchedules();
  if (isSchedulePast(schedule)) return;
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {schedule.isActive && (
          <ScheduleDeleteAction
            schedule={schedule}
            isVisible={isVisible}
          />
        )}
        {schedule.isActive && (
          <ScheduleEditAction
            schedule={schedule}
            isVisible={isVisible}
          />
        )}
      </div>
      <ScheduleSwitch schedule={schedule} />
    </div>
  );
};
