import { Schedule } from '../../../../shared/types';
import { Button } from '../../components/ui/button';
import { EditScheduleDialog } from './edit-schedule-dialog';
import { EditIcon } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useState } from 'react';

const itemAnimation: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.1, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.15, ease: 'easeIn' } },
};

interface ScheduleEditActionProps {
  schedule: Schedule;
  isVisible: boolean;
}

export const ScheduleEditAction = ({
  schedule,
  isVisible,
}: ScheduleEditActionProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.span
          variants={itemAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <EditIcon />
          </Button>
        </motion.span>
      )}
      <EditScheduleDialog
        schedule={schedule}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </AnimatePresence>
  );
};
