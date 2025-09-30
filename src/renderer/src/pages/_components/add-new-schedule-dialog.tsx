import { KbdIndicator } from '../../components/kbd-indicator';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import { useAddScheduleDialog } from '../../contexts/add-schedule-dialog-context';
import { useIsMac } from '../../hooks/use-is-mac';
import { AddNewScheduleForm } from './add-new-schedule-form';
import { PlusIcon } from 'lucide-react';

export const AddNewScheduleDialog = () => {
  const { isDialogOpen, openDialog, closeDialog } = useAddScheduleDialog();
  const isMac = useIsMac();
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => (open ? openDialog() : closeDialog())}
    >
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              <p className="hidden md:block">Add New</p>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1.5">
          <p>Use </p>
          <KbdIndicator className="inline-flex h-fit bg-transparent text-white border-1">
            {isMac ? '⌘' : 'Ctrl'} + ↵
          </KbdIndicator>{' '}
          <p>to quickly create new schedule</p>
        </TooltipContent>
      </Tooltip>
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
