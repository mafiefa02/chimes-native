import { InsetShadowCard } from '../../../components/inset-shadow-card';
import { buttonVariants } from '../../../components/ui/button/button-variants';
import { Checkbox } from '../../../components/ui/checkbox';
import { Input } from '../../../components/ui/input';
import { useGetProfileSchedules } from '../../../hooks/queries/use-get-schedule-profiles';
import { useAppConfig } from '../../../hooks/use-app-config';
import { cn, setAppConfigProperty } from '../../../lib/utils';
import { AddNewScheduleProfileDialog } from './add-new-schedule-profile-dialog';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export const ProfileSelector = () => {
  const [search, setSearch] = useState('');

  const selectedProfileId = useAppConfig('activeProfileSchedule');
  const { data: profiles, isPending, isError } = useGetProfileSchedules();

  if (isPending) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4">Error loading profiles.</p>;

  const availableProfiles =
    profiles?.filter((profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <InsetShadowCard className="space-y-2 p-4 size-full">
      <div className="flex items-center gap-2">
        <Input
          leftAdornment={<SearchIcon size={16} />}
          placeholder="Search profile name..."
          onChange={({ currentTarget }) => setSearch(currentTarget.value)}
        />
        <AddNewScheduleProfileDialog />
      </div>
      {availableProfiles.map((profile) => (
        <div
          key={profile.id}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'flex items-center w-full justify-start py-6 bg-secondary',
            selectedProfileId === profile.id && 'bg-white',
          )}
        >
          <p>{profile.name}</p>
          <Checkbox
            className="ml-auto"
            onCheckedChange={() =>
              setAppConfigProperty('activeProfileSchedule', profile.id)
            }
            checked={selectedProfileId === profile.id}
          />
        </div>
      ))}
    </InsetShadowCard>
  );
};
