import { EmptyState } from '../../components/empty-state';
import { LoadingSkeletons } from '../../components/loading-skeletons';
import { useAppConfig } from '../../hooks/use-app-config';
import { containerVariants, fadeInOut } from '../../lib/animations';
import { useChangeDateShortcut } from '../_hooks/use-change-date-shortcut';
import { useCreateScheduleShortcut } from '../_hooks/use-create-schedule-shortcut';
import { useSchedules } from '../_hooks/use-schedules';
import { ScheduleListContent } from './schedule-list-content';
import { ScheduleListError } from './schedule-list-error';
import { AnimatePresence, motion } from 'motion/react';

export const ScheduleList = () => {
  const profileId = useAppConfig('activeProfileSchedule');
  const { schedules, isPending, isError, isSchedulePast, isUpcomingSchedule } =
    useSchedules();

  useChangeDateShortcut();
  useCreateScheduleShortcut();

  return (
    <AnimatePresence mode="popLayout">
      {isPending ? (
        <motion.div
          key={`loading-${profileId}`}
          className="space-y-2 overflow-y-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoadingSkeletons />
        </motion.div>
      ) : isError ? (
        <motion.div key={`error-${profileId}`}>
          <ScheduleListError />
        </motion.div>
      ) : schedules.length > 0 ? (
        <motion.div
          key={profileId}
          className="grid grid-flow-row gap-y-2"
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
        <motion.div
          className="grid h-full"
          key={`empty-state-${profileId}`}
          variants={fadeInOut}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <EmptyState
            title="Oops! No data found"
            description="We couldn't find any schedule for today"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
