import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { AddNewWeeklyScheduleForm } from './add-new-weekly-schedule-form';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface AddNewWeeklyScheduleProps {
  selectedDay: number;
}

export const AddNewWeeklySchedule = ({
  selectedDay,
}: AddNewWeeklyScheduleProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Weekly Schedule</DialogTitle>
          <DialogDescription>
            Create a new daily or weekly schedule to run on selected days.
          </DialogDescription>
        </DialogHeader>
        <AddNewWeeklyScheduleForm
          selectedDay={selectedDay}
          closeDialog={() => setIsDialogOpen(false)}
          formAction={
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  );
};
