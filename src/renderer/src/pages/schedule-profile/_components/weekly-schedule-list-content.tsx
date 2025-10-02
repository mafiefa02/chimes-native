import { Schedule } from '../../../../../shared/types';
import { itemVariantsFromTop } from '../../../lib/animations';
import { WeeklyScheduleListItem } from './weekly-schedule-list-item';
import { motion } from 'motion/react';

interface WeeklyScheduleListContentProps {
  schedules: Schedule[];
  isUpcomingSchedule: (schedule: Schedule) => boolean;
}

export const WeeklyScheduleListContent = ({
  schedules,
  isUpcomingSchedule,
}: WeeklyScheduleListContentProps) => {
  return schedules.map((schedule) => (
    <motion.div
      layout
      key={schedule.id}
      variants={itemVariantsFromTop}
    >
      <WeeklyScheduleListItem
        schedule={schedule}
        isUpcomingSchedule={isUpcomingSchedule}
      />
    </motion.div>
  ));
};
