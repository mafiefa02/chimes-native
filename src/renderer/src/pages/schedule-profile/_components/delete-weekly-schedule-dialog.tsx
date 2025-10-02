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
import { useDeleteSchedule } from '../../../hooks/mutations/use-delete-schedule';

interface DeleteWeeklyScheduleDialogProps {
  schedule: Schedule;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export const DeleteWeeklyScheduleDialog = ({
  schedule,
  isDialogOpen,
  setIsDialogOpen,
}: DeleteWeeklyScheduleDialogProps) => {
  const { mutate: deleteEntireSchedule } = useDeleteSchedule(
    schedule.id,
    new Date(),
  );

  const handleDelete = () => {
    deleteEntireSchedule();
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Schedule</DialogTitle>
          <DialogDescription>
            You&apos;re about to delete this schedule. This action is
            irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
