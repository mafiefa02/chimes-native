import { upcomingBadge } from '../lib/animations';
import { Badge } from './ui/badge';
import { AnimatePresence, motion } from 'motion/react';

interface ScheduleUpcomingInfoProps {
  scheduleIsUpcoming: boolean;
  isVisible?: boolean;
}
export const ScheduleUpcomingInfo = ({
  scheduleIsUpcoming,
  isVisible = false,
}: ScheduleUpcomingInfoProps) => {
  return (
    <AnimatePresence>
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
