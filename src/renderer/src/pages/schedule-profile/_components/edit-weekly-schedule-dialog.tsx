import { Schedule } from '../../../../../shared/types';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { EditWeeklyScheduleForm } from './edit-weekly-schedule-form';

interface EditWeeklyScheduleDialogProps {
  schedule: Schedule;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export const EditWeeklyScheduleDialog = ({
  schedule,
  isDialogOpen,
  setIsDialogOpen,
}: EditWeeklyScheduleDialogProps) => {
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Weekly Schedule</DialogTitle>
          <DialogDescription>
            Make changes to your weekly schedule here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditWeeklyScheduleForm
          schedule={schedule}
          closeDialog={() => setIsDialogOpen(false)}
          formAction={
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  );
};
