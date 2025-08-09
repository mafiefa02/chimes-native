import { CalendarIcon, HomeIcon, LogInIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const MainHeader = () => {
  return (
    <header className="px-5 py-3">
      <div className="flex items-center justify-between gap-2">
        {/* TODO: implement breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <HomeIcon className="size-4" />
          <p>Home</p>
        </div>
        <div className="flex items-center gap-4">
          {/* TODO: implement active profile switcher */}
          <Select defaultValue="active-profile">
            <SelectTrigger>
              <CalendarIcon />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Profiles</SelectLabel>
                <SelectItem value="active-profile">Active Profile</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* TODO: implement login action */}
          <Button
            variant="outline"
            size="icon"
          >
            <LogInIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};
