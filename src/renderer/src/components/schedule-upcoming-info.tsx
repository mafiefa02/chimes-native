import { Badge } from './ui/badge';
import { AnimatePresence, motion } from 'motion/react';
import { upcomingBadge } from '../lib/animations';

interface ScheduleUpcomingInfoProps {
  scheduleIsUpcoming: boolean;
  isVisible?: boolean;
}
export const ScheduleUpcomingInfo = ({
  scheduleIsUpcoming,
  isVisible = false,
}: ScheduleUpcomingInfoProps) => {
  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
    >
      {scheduleIsUpcoming && !isVisible && (
        <motion.span
          variants={upcomingBadge}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Badge className="bg-primary font-bold text-primary-foreground text-xs">
            Upcoming
          </Badge>
        </motion.span>
      )}
    </AnimatePresence>
  );
};