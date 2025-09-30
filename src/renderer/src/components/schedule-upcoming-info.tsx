import { Badge } from './ui/badge';
import { AnimatePresence, motion, Transition, Variants } from 'motion/react';

const animationTransition: Transition = { duration: 0.3, ease: 'backInOut' };
const animation: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 0, opacity: 0, transition: { duration: 0.1 } },
};

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
          transition={animationTransition}
          variants={animation}
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
