import { NewScheduleHistory, ScheduleHistory } from '../../shared/types';

type GetScheduleHistoryBySchedule = (
  scheduleId: ScheduleHistory['scheduleId'],
) => Promise<ScheduleHistory[]>;

type CreateScheduleHistory = (
  data: NewScheduleHistory,
) => Promise<ScheduleHistory[]>;

export interface ScheduleHistoryServices {
  getBySchedule: GetScheduleHistoryBySchedule;
  create: CreateScheduleHistory;
}
