import { ScheduleProfile } from '../../../../../shared/types';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { useGetProfileSchedules } from '../../../hooks/queries/use-get-schedule-profiles';
import { useAppConfig } from '../../../hooks/use-app-config';
import { setAppConfigProperty } from '../../../lib/utils';
import { AddNewScheduleProfileForm } from './add-new-schedule-profile-form';
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
} from 'lucide-react';
import { useState } from 'react';

export const ProfileSelectorDropdown = () => {
  const {
    data: profileSchedules,
    isError,
    isPending,
  } = useGetProfileSchedules();
  const currentActiveProfileId = useAppConfig('activeProfileSchedule');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isPending) return 'Loading...';
  if (isError) return 'Something went wrong.';

  const isActiveProfile = (profile: ScheduleProfile) =>
    profile.id === currentActiveProfileId;
  const currentActiveProfile = profileSchedules.find(isActiveProfile);

  const handleProfileCreated = (profile: ScheduleProfile) => {
    setAppConfigProperty('activeProfileSchedule', profile.id);
    setIsDialogOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DropdownMenu
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <CalendarIcon />
            {currentActiveProfile?.name ?? 'Unknown'}
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Profiles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileSchedules.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              onClick={() => handleProfileCreated(profile)}
              className="flex items-center justify-between"
            >
              {profile.name}
              {isActiveProfile(profile) && <CheckIcon />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsDialogOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <PlusIcon />
            <p>Add New</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Schedule Profile</DialogTitle>
          <DialogDescription>
            Create a new profile to group your schedules.
          </DialogDescription>
        </DialogHeader>
        <AddNewScheduleProfileForm
          onSuccess={handleProfileCreated}
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
