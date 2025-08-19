import { useSchedules } from './hooks/use-schedules';
import { ScheduleCard } from './schedule-card';

export const ScheduleList = () => {
  const { schedules, isPending, isError, onToggle } = useSchedules();

  if (isPending) return 'Loading...';
  if (isError) return 'Error!';

  return (
    <div className="space-y-3 h-full flex flex-col">
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          onToggleActive={onToggle}
        />
      ))}
    </div>
  );
};
