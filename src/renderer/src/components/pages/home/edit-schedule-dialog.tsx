import { Schedule } from '../../../../../shared/types';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { EditScheduleForm } from './edit-schedule-form';

interface EditScheduleDialogProps {
  schedule: Schedule;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export const EditScheduleDialog = ({
  schedule,
  isDialogOpen,
  setIsDialogOpen,
}: EditScheduleDialogProps) => {
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogDescription>
            Edit the schedule details below.
          </DialogDescription>
        </DialogHeader>
        <EditScheduleForm
          schedule={schedule}
          closeDialog={closeDialog}
          formAction={
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  );
};
