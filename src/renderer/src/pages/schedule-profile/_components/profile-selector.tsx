import { ScheduleProfile } from '../../../../../shared/types';
import { InsetShadowCard } from '../../../components/inset-shadow-card';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import { useGetProfileSchedules } from '../../../hooks/queries/use-get-schedule-profiles';
import { useAppConfig } from '../../../hooks/use-app-config';
import { cn, setAppConfigProperty } from '../../../lib/utils';
import { AddNewScheduleProfileDialog } from './add-new-schedule-profile-dialog';

export const ProfileSelector = () => {
  const selectedProfileId = useAppConfig('activeProfileSchedule');
  const { data: profiles, isPending, isError } = useGetProfileSchedules();

  if (isPending) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4">Error loading profiles.</p>;

  const changeProfile = (profile: ScheduleProfile) =>
    setAppConfigProperty('activeProfileSchedule', profile.id);

  return (
    <InsetShadowCard className="space-y-2 p-4 size-full">
      {profiles?.map((profile) => (
        <Button
          key={profile.id}
          onClick={() => changeProfile(profile)}
          variant="outline"
          className={cn(
            'flex items-center w-full justify-start py-6 bg-secondary',
            selectedProfileId === profile.id && 'bg-white',
          )}
        >
          <p>{profile.name}</p>
          <Checkbox
            className="ml-auto"
            checked={selectedProfileId === profile.id}
          />
        </Button>
      ))}
      <AddNewScheduleProfileDialog />
    </InsetShadowCard>
  );
};
