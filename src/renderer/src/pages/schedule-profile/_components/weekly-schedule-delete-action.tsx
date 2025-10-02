import { Schedule } from '../../../../../shared/types';
import { Button } from '../../../components/ui/button';
import { itemVariantsXFromRight } from '../../../lib/animations';
import { DeleteWeeklyScheduleDialog } from './delete-weekly-schedule-dialog';
import { TrashIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface WeeklyScheduleDeleteActionProps {
  schedule: Schedule;
  isVisible: boolean;
}

export const WeeklyScheduleDeleteAction = ({
  schedule,
  isVisible,
}: WeeklyScheduleDeleteActionProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <TrashIcon />
          </Button>
        </motion.span>
      )}
      <DeleteWeeklyScheduleDialog
        schedule={schedule}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
};
