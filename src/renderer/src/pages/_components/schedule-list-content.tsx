import type { Schedule } from '../../../../shared/types';
import { itemVariantsFromTop } from '../../lib/animations';
import { ScheduleListItem } from './schedule-list-item';
import { motion } from 'motion/react';

interface ScheduleListContentProps {
  schedules: Schedule[];
  isSchedulePast: (schedule: Schedule) => boolean;
  isUpcomingSchedule: (schedule: Schedule) => boolean;
}

export const ScheduleListContent = ({
  schedules,
  isSchedulePast,
  isUpcomingSchedule,
}: ScheduleListContentProps) => {
  return schedules.map((schedule) => (
    <motion.div
      layout
      key={schedule.id}
      variants={itemVariantsFromTop}
    >
      <ScheduleListItem
        schedule={schedule}
        isSchedulePast={isSchedulePast}
        isUpcomingSchedule={isUpcomingSchedule}
      />
    </motion.div>
  ));
};
