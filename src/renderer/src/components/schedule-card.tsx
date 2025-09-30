import { Schedule } from '../../../shared/types';
import {
  cn,
  formatDateToLocalTimezone,
  parseDateStringAsUTC,
} from '../lib/utils';
import { ScheduleMusicInformation } from './schedule-music-information';
import { ScheduleRepeatInformation } from './schedule-repeat-information';

interface ScheduleCardExtras {
  header?: React.ReactNode;
  headerAside?: React.ReactNode;
  subHeader?: React.ReactNode;
  actions?: React.ReactNode;
}

interface ScheduleCardProps {
  schedule: Schedule;
  className?: string;
  extras?: ScheduleCardExtras;
}

export const ScheduleCardRoot = ({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  return (
    <div
      className={cn(
        'group flex h-fit items-center gap-6 rounded-3xl px-9 py-5 bg-card border text-card-foreground',
        className,
      )}
      {...props}
    />
  );
};

interface ScheduleCardTimeProps extends React.ComponentPropsWithRef<'span'> {
  time: string; // HH:mm format
}

export const ScheduleCardTime = ({
  className,
  time,
  ...props
}: ScheduleCardTimeProps) => {
  const scheduleTime = formatDateToLocalTimezone(
    parseDateStringAsUTC(time, 'HH:mm'),
    'HH:mm',
  );

  return (
    <span
      className={cn('tabular-nums text-lg font-bold', className)}
      {...props}
    >
      {scheduleTime}
    </span>
  );
};

export const ScheduleCardContent = ({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-center gap-1',
        className,
      )}
      {...props}
    />
  );
};

interface ScheduleCardTitleProps extends React.ComponentPropsWithRef<'span'> {
  title: string;
}

export const ScheduleCardTitle = ({
  className,
  title,
  ...props
}: ScheduleCardTitleProps) => {
  return (
    <span
      className={cn('text-lg font-bold line-clamp-1 text-ellipsis', className)}
      {...props}
    >
      {title}
    </span>
  );
};

interface ScheduleCardInfoProps extends React.ComponentPropsWithRef<'div'> {
  schedule: Schedule;
}

export const ScheduleCardInfo = ({
  className,
  schedule,
  ...props
}: ScheduleCardInfoProps) => {
  return (
    <div
      className={cn('flex items-center gap-4 pt-1 text-sm', className)}
      {...props}
    >
      <ScheduleMusicInformation schedule={schedule} />
      <ScheduleRepeatInformation schedule={schedule} />
    </div>
  );
};

export const ScheduleCardActions = ({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  return (
    <div
      className={cn('ml-auto flex-shrink-0', className)}
      {...props}
    />
  );
};

export const ScheduleCard = ({
  schedule,
  className,
  extras,
}: Readonly<ScheduleCardProps>) => {
  const scheduleTime = formatDateToLocalTimezone(
    parseDateStringAsUTC(schedule.triggerTime, 'HH:mm'),
    'HH:mm',
  );
  return (
    <div
      className={cn(
        'group flex h-fit items-center gap-6 rounded-3xl px-9 py-5 bg-card border text-card-foreground',
        className,
      )}
    >
      <span className="tabular-nums font-bold text-lg">{scheduleTime}</span>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start justify-center gap-1 w-full">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">{schedule.name}</span>
              {extras?.header}
            </div>
            {extras?.headerAside}
          </div>
          {extras?.subHeader}
          <div className="flex items-center gap-4 text-sm pt-1">
            <ScheduleMusicInformation schedule={schedule} />
            <ScheduleRepeatInformation schedule={schedule} />
          </div>
        </div>
        {extras?.actions}
      </div>
    </div>
  );
};
