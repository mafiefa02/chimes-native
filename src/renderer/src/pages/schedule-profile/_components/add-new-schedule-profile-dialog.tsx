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
import { AddNewScheduleProfileForm } from './add-new-schedule-profile-form';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const AddNewScheduleProfileDialog = () => {
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
          <DialogTitle>Create New Schedule Profile</DialogTitle>
          <DialogDescription>
            Create a new profile to group your schedules.
          </DialogDescription>
        </DialogHeader>
        <AddNewScheduleProfileForm
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
