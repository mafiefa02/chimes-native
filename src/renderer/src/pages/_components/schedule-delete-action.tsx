import { Schedule } from '../../../../shared/types';
import { Button } from '../../components/ui/button';
import { itemVariantsXFromRight } from '../../lib/animations';
import { DeleteScheduleDialog } from './delete-schedule-dialog';
import { TrashIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

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
          variants={itemVariantsXFromRight}
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
