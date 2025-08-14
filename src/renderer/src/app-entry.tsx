import { MainLayout } from './components/main-layout';
import { useQuery } from '@tanstack/react-query';

const fetchNotes = async () => {
  const { data, error } = await window.api.notes.getAll();
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const AppEntry = () => {
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery({ queryKey: ['notes'], queryFn: fetchNotes });

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Notes</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        <ul>
          {notes?.map((note) => (
            <li
              key={note.id}
              className="border-b p-2"
            >
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};
