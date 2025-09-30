import { Schedule } from '../../../../shared/types';
import { Button } from '../../components/ui/button';
import { DeleteScheduleDialog } from './delete-schedule-dialog';
import { TrashIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useState } from 'react';

const itemAnimation: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.1, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.15, ease: 'easeIn' } },
};

interface ScheduleDeleteActionProps {
  schedule: Schedule;
  isVisible: boolean;
}

export const ScheduleDeleteAction = ({
  schedule,
  isVisible,
}: ScheduleDeleteActionProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <TrashIcon />
          </Button>
        </motion.span>
      )}
      <DeleteScheduleDialog
        schedule={schedule}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={setIsDeleteDialogOpen}
      />
    </AnimatePresence>
  );
};
