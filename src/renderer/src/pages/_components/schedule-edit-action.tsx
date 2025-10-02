import { Schedule } from '../../../../shared/types';
import { Button } from '../../components/ui/button';
import { itemVariantsXFromRight } from '../../lib/animations';
import { EditScheduleDialog } from './edit-schedule-dialog';
import { EditIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

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
    <>
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
    </>
  );
};
