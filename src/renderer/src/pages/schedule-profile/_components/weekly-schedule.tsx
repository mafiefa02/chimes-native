import { InsetShadowCard } from '../../../components/inset-shadow-card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ISO_DAY_OF_WEEKS } from '../../../lib/constants';
import { WeeklyScheduleDaySelector } from './weekly-schedule-day-selector';
import { WeeklyScheduleList } from './weekly-schedule-list';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
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
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search for schedule name..."
          leftAdornment={<SearchIcon size={16} />}
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button size="icon">
          <PlusIcon />
        </Button>
      </div>
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <InsetShadowCard className="overflow-y-auto space-y-2">
          <WeeklyScheduleList
            selectedDay={selectedDay}
            searchQuery={search}
          />
        </InsetShadowCard>
      </AnimatePresence>
    </div>
  );
};
