import { Skeleton } from '../../components/ui/skeleton';
import { containerVariants, itemVariantsFromTop } from '../../lib/animations';
import { useSchedules } from '../_hooks/use-schedules';
import { ScheduleListItem } from './schedule-list-item';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';

export const ScheduleList = () => {
  const { schedules, isPending, isError, isSchedulePast, isUpcomingSchedule } =
    useSchedules();
  const schedulesAreAvailable = !isPending && !isError;

  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
    >
      {isPending && (
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
      )}
      {isError && <p key="error">Error!</p>}
      {schedulesAreAvailable && (
        <motion.div
          key="schedules"
          className="space-y-2"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <AnimatePresence mode="wait">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <motion.div
                  layout
                  key={schedule.id}
                  variants={itemVariantsFromTop}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ScheduleListItem
                    schedule={schedule}
                    isSchedulePast={isSchedulePast}
                    isUpcomingSchedule={isUpcomingSchedule}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                key="not-available"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No schedules for this day.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoadingSkeletons = () => {
  const RANDOM_NUMBER_OF_DUMMIES = useMemo(
    () => Math.max(5, Math.floor(Math.random() * 10)),
    [],
  );

  return new Array(RANDOM_NUMBER_OF_DUMMIES).fill(0).map((_, idx) => (
    <motion.div
      key={`loading-${idx}`}
      variants={itemVariantsFromTop}
    >
      <Skeleton className="w-full h-24 bg-primary/5 rounded-3xl" />
    </motion.div>
  ));
};
