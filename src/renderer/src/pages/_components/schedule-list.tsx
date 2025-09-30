import { EmptyState } from '../../components/empty-state';
import { LoadingSkeletons } from '../../components/loading-skeletons';
import { containerVariants } from '../../lib/animations';
import { useChangeDateShortcut } from '../_hooks/use-change-date-shortcut';
import { useCreateScheduleShortcut } from '../_hooks/use-create-schedule-shortcut';
import { useSchedules } from '../_hooks/use-schedules';
import { ScheduleListContent } from './schedule-list-content';
import { ScheduleListError } from './schedule-list-error';
import { AnimatePresence, motion } from 'motion/react';

export const ScheduleList = () => {
  const { schedules, isPending, isError, isSchedulePast, isUpcomingSchedule } =
    useSchedules();

  useChangeDateShortcut();
  useCreateScheduleShortcut();

  return (
    <div className="flex flex-col gap-2 h-full overflow-hidden">
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        {isPending ? (
          <motion.div
            key="loading"
            className="space-y-2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LoadingSkeletons />
          </motion.div>
        ) : isError ? (
          <motion.div key="error">
            <ScheduleListError />
          </motion.div>
        ) : schedules.length > 0 ? (
          <motion.div
            key="schedules-list"
            className="flex flex-col gap-2 h-full"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ScheduleListContent
              schedules={schedules}
              isSchedulePast={isSchedulePast}
              isUpcomingSchedule={isUpcomingSchedule}
            />
          </motion.div>
        ) : (
          <motion.div key="empty-state">
            <EmptyState
              title="Oops! No data found"
              description="We couldn't find any schedule for today"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
