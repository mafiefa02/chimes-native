import { Schedule } from '../../../../shared/types';
import {
  ScheduleCardActions,
  ScheduleCardContent,
  ScheduleCardInfo,
  ScheduleCardRoot,
  ScheduleCardTime,
  ScheduleCardTitle,
} from '../../components/schedule-card';
import { ScheduleUpcomingInfo } from '../../components/schedule-upcoming-info';
import { itemVariantsFromTop } from '../../lib/animations';
import { cn } from '../../lib/utils';
import { ScheduleActions } from './schedule-actions';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ScheduleListItemProps {
  schedule: Schedule;
  isSchedulePast: (schedule: Schedule) => boolean;
  isUpcomingSchedule: (schedule: Schedule) => boolean;
}

export const ScheduleListItem = ({
  schedule,
  isSchedulePast,
  isUpcomingSchedule,
}: ScheduleListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      variants={itemVariantsFromTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScheduleCardRoot
        className={cn(
          (!schedule.isActive || isSchedulePast(schedule)) &&
            'bg-card/20 text-card-foreground/20',
        )}
      >
        <ScheduleCardTime time={schedule.triggerTime} />
        <div className="flex w-full items-center justify-between gap-4">
          <ScheduleCardContent>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ScheduleCardTitle title={schedule.name} />
                <ScheduleUpcomingInfo
                  isVisible={isHovered}
                  scheduleIsUpcoming={isUpcomingSchedule(schedule)}
                />
              </div>
            </div>
            <ScheduleCardInfo schedule={schedule} />
          </ScheduleCardContent>
        </div>
        <ScheduleCardActions>
          <ScheduleActions
            schedule={schedule}
            isVisible={isHovered}
          />
        </ScheduleCardActions>
      </ScheduleCardRoot>
    </motion.div>
  );
};
