import { Button } from '../../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { AddNewScheduleForm } from './add-new-schedule-form';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const AddNewScheduleDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          <p className="hidden md:block">Add New</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Schedule</DialogTitle>
          <DialogDescription>
            Create a new schedule to run a profile at a specific time.
          </DialogDescription>
        </DialogHeader>
        <AddNewScheduleForm
          closeDialog={closeDialog}
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
