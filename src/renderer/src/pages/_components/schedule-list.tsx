import { Skeleton } from '../../components/ui/skeleton';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { containerVariants, itemVariantsFromTop } from '../../lib/animations';
import { useSchedules } from '../_hooks/use-schedules';
import { ScheduleListItem } from './schedule-list-item';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';

export const ScheduleList = () => {
  const { date } = useScheduleDate();
  const { schedules, isPending, isError, isSchedulePast, isUpcomingSchedule } =
    useSchedules();
  const schedulesAreAvailable = !isPending && !isError;

  return (
    <AnimatePresence
      mode="wait"
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
          key={format(date, 'dd-MM-yyyy')}
          className="space-y-2"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {schedules.map((schedule) => (
            <ScheduleListItem
              key={schedule.id}
              schedule={schedule}
              isSchedulePast={isSchedulePast}
              isUpcomingSchedule={isUpcomingSchedule}
            />
          ))}
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
