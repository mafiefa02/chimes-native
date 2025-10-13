import { Schedule } from '../../../../../shared/types';
import { Button } from '../../../components/ui/button';
import { itemVariantsXFromRight } from '../../../lib/animations';
import { EditWeeklyScheduleDialog } from './edit-weekly-schedule-dialog';
import { EditIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface WeeklyScheduleEditActionProps {
  schedule: Schedule;
  isVisible: boolean;
}

export const WeeklyScheduleEditAction = ({
  schedule,
  isVisible,
}: WeeklyScheduleEditActionProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
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
      </AnimatePresence>
      <EditWeeklyScheduleDialog
        schedule={schedule}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
};
