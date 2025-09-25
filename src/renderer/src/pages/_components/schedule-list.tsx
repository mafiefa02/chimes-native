import { Skeleton } from '../../components/ui/skeleton';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { useSchedules } from '../_hooks/use-schedules';
import { ScheduleCard } from './schedule-card';
import { format } from 'date-fns';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useMemo } from 'react';

const containerAnimation: Variants = {
  animate: { transition: { staggerChildren: 0.08, ease: 'easeIn' } },
  exit: {
    transition: {
      staggerChildren: 0.035,
      staggerDirection: -1,
      ease: 'easeOut',
    },
  },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: -20 },
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
      {isPending && (
        <motion.div
          key="loading"
          className="space-y-2"
          variants={containerAnimation}
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

const LoadingSkeletons = () => {
  const RANDOM_NUMBER_OF_DUMMIES = useMemo(
    () => Math.max(5, Math.floor(Math.random() * 10)),
    [],
  );

  return new Array(RANDOM_NUMBER_OF_DUMMIES).fill(0).map((_, idx) => (
    <motion.div
      key={`loading-${idx}`}
      variants={itemAnimation}
    >
      <Skeleton className="w-full h-24 bg-primary/5 rounded-3xl" />
    </motion.div>
  ));
};
