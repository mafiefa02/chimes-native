import { EmptyState } from '../../../components/empty-state';
import { LoadingSkeletons } from '../../../components/loading-skeletons';
import { containerVariants, fadeInOut } from '../../../lib/animations';
import { getDayName } from '../../../lib/utils';
import { useWeeklySchedules } from '../_hooks/use-weekly-schedules';
import { WeeklyScheduleListContent } from './weekly-schedule-list-content';
import { AnimatePresence, motion } from 'framer-motion';

interface WeeklyScheduleListProp {
  selectedDay: number;
  searchQuery?: string;
}

export const WeeklyScheduleList = ({
  selectedDay,
  searchQuery,
}: WeeklyScheduleListProp) => {
  const { schedules, isScheduleUpcoming, isPending, isError } =
    useWeeklySchedules({ selectedDay, searchQuery });

  const dayName = getDayName(selectedDay);

  return (
    <AnimatePresence mode="popLayout">
      {isPending ? (
        <motion.div
          key="loading"
          className="space-y-2 overflow-y-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoadingSkeletons />
        </motion.div>
      ) : isError ? (
        <motion.div key="error">
          <p>Error!</p>
        </motion.div>
      ) : schedules && schedules.length > 0 ? (
        <motion.div
          key="schedules-list"
          className="grid grid-flow-row gap-y-2"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <WeeklyScheduleListContent
            schedules={schedules}
            isUpcomingSchedule={isScheduleUpcoming}
          />
        </motion.div>
      ) : (
        <motion.div
          className="grid h-full"
          key="empty-state"
          variants={fadeInOut}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <EmptyState
            title="Oops! No data found"
            description={
              searchQuery
                ? `We can't find the schedule ${searchQuery}`
                : `There is no weekly schedule for ${dayName}`
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
