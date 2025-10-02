import { InsetShadowCard } from '../../../components/inset-shadow-card';
import { Input } from '../../../components/ui/input';
import { ISO_DAY_OF_WEEKS } from '../../../lib/constants';
import { AddNewWeeklySchedule } from './add-new-weekly-schedule';
import { WeeklyScheduleDaySelector } from './weekly-schedule-day-selector';
import { WeeklyScheduleList } from './weekly-schedule-list';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState(ISO_DAY_OF_WEEKS[0]);
  const [search, setSearch] = useState('');

  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-4 size-full">
      <WeeklyScheduleDaySelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search for schedule name..."
          leftAdornment={<SearchIcon size={16} />}
          onChange={({ target }) => setSearch(target.value)}
        />
        <AddNewWeeklySchedule selectedDay={selectedDay} />
      </div>
      <InsetShadowCard className="overflow-y-auto space-y-2 no-scrollbar">
        <WeeklyScheduleList
          selectedDay={selectedDay}
          searchQuery={search}
        />
      </InsetShadowCard>
    </div>
  );
};
