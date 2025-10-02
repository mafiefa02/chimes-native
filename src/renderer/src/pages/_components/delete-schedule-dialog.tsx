import { Schedule } from '../../../../shared/types';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { useDeleteSchedule } from '../../hooks/mutations/use-delete-schedule';
import { useUpdateSchedule } from '../../hooks/mutations/use-update-schedule';
import { useScheduleDate } from '../../hooks/use-schedule-date';
import { countRemainingOccurrences } from '../../lib/utils';
import { endOfDay, isSameDay, subDays } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteScheduleDialogProps {
  schedule: Schedule;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

type DeleteActionType = 'this-and-following' | 'all-schedules';

export const DeleteScheduleDialog = ({
  schedule,
  isDialogOpen,
  setIsDialogOpen,
}: DeleteScheduleDialogProps) => {
  const { date } = useScheduleDate();
  const isOneTimeEvent = schedule.repeat === 'once';
  const [deleteAction, setDeleteAction] =
    useState<DeleteActionType>('this-and-following');
  const { mutate: deleteEntireSchedule } = useDeleteSchedule(schedule.id, date);
  const { mutate: updateScheduleSeries } = useUpdateSchedule(date);

  const stopFollowingSchedules = () => {
    const newEndDate = subDays(date, 1);
    const newScheduleData = { ...schedule, repeatEnd: endOfDay(newEndDate) };

    const remaining = countRemainingOccurrences(newScheduleData, newEndDate);

    const isNowSingleEvent =
      remaining === 1 ||
      (remaining === 0 && isSameDay(schedule.repeatStart, newEndDate));

    updateScheduleSeries(
      {
        id: schedule.id,
        repeatEnd: newScheduleData.repeatEnd,
        repeat: isNowSingleEvent ? 'once' : schedule.repeat,
      },
      {
        onSuccess: () =>
          toast.success(
            'Successfully deleted the schedule for today and upcoming days!',
          ),
      },
    );
  };

  const handleDelete = () => {
    const shouldDeleteEntirely =
      isOneTimeEvent || deleteAction === 'all-schedules';

    if (shouldDeleteEntirely) {
      deleteEntireSchedule();
    } else {
      stopFollowingSchedules();
    }

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
        {!isOneTimeEvent && (
          <RadioGroup
            value={deleteAction}
            onValueChange={(value) =>
              setDeleteAction(value as DeleteActionType)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="this-and-following"
                id="this-and-following"
              />
              <Label htmlFor="this-and-following">
                This and following schedule
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="all-schedules"
                id="all-schedules"
              />
              <Label htmlFor="all-schedules">All schedules</Label>
            </div>
          </RadioGroup>
        )}
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
