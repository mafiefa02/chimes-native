import { Skeleton } from '../../ui/skeleton';
import { useScheduleDate } from './hooks/use-schedule-date';
import { useSchedules } from './hooks/use-schedules';
import { ScheduleCard } from './schedule-card';
import { format } from 'date-fns';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useMemo } from 'react';

const containerAnimation: Variants = {
  animate: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.001, staggerDirection: -1 } },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15, ease: 'easeIn' } },
};

export const ScheduleList = () => {
  const { date } = useScheduleDate();
  const { schedules, isPending, isError, onToggle } = useSchedules(date);
  const schedulesAreAvailable = !isPending && !isError;

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      {isPending && <LoadingScheduleList key="loading" />}
      {isError && <p key="error">Error!</p>}
      {schedulesAreAvailable && (
        <motion.div
          key={format(date, 'dd-MM-yyyy')}
          className="space-y-2"
          variants={containerAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoadingScheduleList = () => {
  const RANDOM_NUMBER_OF_DUMMIES = useMemo(
    () => Math.max(3, Math.floor(Math.random() * 6)),
    [],
  );

  return (
    <motion.div
      className="space-y-2"
      variants={containerAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {new Array(RANDOM_NUMBER_OF_DUMMIES).fill(0).map((_, idx) => (
        <motion.div
          key={`loading-${idx}`}
          variants={itemAnimation}
        >
          <Skeleton className="w-full h-24 bg-primary/5 rounded-3xl" />
        </motion.div>
      ))}
    </motion.div>
  );
};
