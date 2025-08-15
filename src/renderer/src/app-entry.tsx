import { MainLayout } from './components/main-layout';
import { useQuery } from '@tanstack/react-query';

const fetchProfiles = async () => {
  const query = await window.services.profiles.getAll();
  return query;
};

export const AppEntry = () => {
  const {
    data: profiles,
    error: profilesError,
    isLoading: profilesLoading,
  } = useQuery({ queryKey: ['profiles'], queryFn: fetchProfiles });

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="mt-8 mb-4 text-2xl font-bold">Profiles</h1>
        {profilesLoading && <p>Loading profiles...</p>}
        {profilesError && (
          <p className="text-red-500">{profilesError.message}</p>
        )}
        <ul>
          {profiles?.map((profile) => (
            <li
              key={profile.id}
              className="border-b p-2"
            >
              <h2 className="font-bold">{profile.displayName}</h2>
              <p>{profile.avatar ?? 'Default'}</p>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};
