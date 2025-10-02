import { Schedule } from '../../../../../shared/types';
import { WeeklyScheduleDeleteAction } from './weekly-schedule-delete-action';
import { WeeklyScheduleEditAction } from './weekly-schedule-edit-action';
import { WeeklyScheduleSwitch } from './weekly-schedule-switch';

interface WeeklyScheduleActionsProps {
  schedule: Schedule;
  isVisible: boolean;
}

export const WeeklyScheduleActions = ({
  schedule,
  isVisible,
}: WeeklyScheduleActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {schedule.isActive && (
          <WeeklyScheduleDeleteAction
            schedule={schedule}
            isVisible={isVisible}
          />
        )}
        {schedule.isActive && (
          <WeeklyScheduleEditAction
            schedule={schedule}
            isVisible={isVisible}
          />
        )}
      </div>
      <WeeklyScheduleSwitch schedule={schedule} />
    </div>
  );
};
