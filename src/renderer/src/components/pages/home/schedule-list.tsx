import { Skeleton } from '../../ui/skeleton';
import { useScheduleDate } from './hooks/use-schedule-date';
import { useSchedules } from './hooks/use-schedules';
import { ScheduleCard } from './schedule-card';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useMemo } from 'react';

const containerAnimation: Variants = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const itemAnimation: Variants = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const ScheduleList = () => {
  const { date } = useScheduleDate();
  const { schedules, isPending, isError, onToggle } = useSchedules(date);

  if (isPending) return <LoadingScheduleList />;
  if (isError) return 'Error!';

  return (
    <motion.div
      className="space-y-3"
      variants={containerAnimation}
      initial="exit"
      animate="animate"
    >
      <AnimatePresence>
        {schedules.map((schedule) => (
          <motion.div
            key={schedule.id}
            variants={itemAnimation}
          >
            <ScheduleCard
              schedule={schedule}
              onToggleActive={onToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const LoadingScheduleList = () => {
  const RANDOM_NUMBER_OF_DUMMIES = useMemo(
    () => Math.max(3, Math.floor(Math.random() * 10)),
    [],
  );
  return (
    <motion.div
      className="space-y-3"
      variants={containerAnimation}
      initial="exit"
      animate="animate"
    >
      <AnimatePresence>
        {new Array(RANDOM_NUMBER_OF_DUMMIES).fill(0).map((_, idx) => (
          <motion.div
            key={`loading-${idx}`}
            variants={itemAnimation}
          >
            <Skeleton className="w-full h-20" />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
