import { useGetProfileSchedules } from '../../hooks/queries/use-get-schedule-profiles';
import { delayedFadeIn } from '../../lib/animations';
import {
  cn,
  getAppConfigProperty,
  setAppConfigProperty,
} from '../../lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { useSidebar } from './hooks/use-sidebar';
import { CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/** TODO: polish the sidebar exit animation */
export const SidebarAction = () => {
  const { isSidebarOpen } = useSidebar();
  const { data: profileSchedules, isLoading } = useGetProfileSchedules();
  const activeProfileSchedule = getAppConfigProperty('activeProfileSchedule');

  /** We can be sure there'd be atleast one schedule profile,
   * so if it is undefined, it is still getting the data. */
  if (isLoading || !profileSchedules)
    return <Skeleton className="w-full h-8" />;

  return (
    <div
      className={cn('flex flex-col gap-2', isSidebarOpen ? 'w-full' : 'w-fit')}
    >
      <Select
        onValueChange={(value) =>
          setAppConfigProperty('activeProfileSchedule', value)
        }
        value={activeProfileSchedule}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 600, damping: 35 }}
        >
          <SelectTrigger
            withIcon={isSidebarOpen}
            className={cn(
              'bg-white',
              isSidebarOpen ? 'w-full' : 'mx-auto w-fit',
            )}
          >
            <div className={'flex items-center gap-2 text-sm'}>
              <CalendarIcon />
              <AnimatePresence initial={false}>
                {isSidebarOpen && (
                  <motion.div
                    key="select-value-text"
                    variants={delayedFadeIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <SelectValue />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SelectTrigger>
        </motion.div>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Profiles</SelectLabel>
            {profileSchedules.map((profile) => (
              <SelectItem
                key={profile.id}
                value={profile.id}
              >
                {profile.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
