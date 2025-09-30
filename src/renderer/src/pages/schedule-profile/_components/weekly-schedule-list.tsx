import { ScheduleCard } from '../../../components/schedule-card';
import { ScheduleUpcomingInfo } from '../../../components/schedule-upcoming-info';
import { Skeleton } from '../../../components/ui/skeleton';
import {
  containerVariants,
  itemVariantsFromTop,
} from '../../../lib/animations';
import { useWeeklySchedules } from '../_hooks/use-weekly-schedules';
import { WeeklyScheduleCardInformations } from './weekly-schedule-card-informations';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';

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
          <WeeklyScheduleListPending />
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
            {schedules && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <motion.div
                  layout
                  key={schedule.id}
                  variants={itemVariantsFromTop}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ScheduleCard
                    schedule={schedule}
                    extras={{
                      header: (
                        <ScheduleUpcomingInfo
                          scheduleIsUpcoming={isScheduleUpcoming(schedule)}
                        />
                      ),
                      subHeader: (
                        <WeeklyScheduleCardInformations schedule={schedule} />
                      ),
                    }}
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
                No data found...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WeeklyScheduleListPending = () => {
  const RANDOM_NUMBER_OF_DUMMIES = useMemo(
    () => Math.max(5, Math.floor(Math.random() * 10)),
    [],
  );

  return new Array(RANDOM_NUMBER_OF_DUMMIES).fill(0).map((_, idx) => (
    <motion.div
      key={`loading-${idx}`}
      variants={itemVariantsFromTop}
    >
      <Skeleton className="w-full h-30 bg-primary/5 rounded-3xl" />
    </motion.div>
  ));
};
