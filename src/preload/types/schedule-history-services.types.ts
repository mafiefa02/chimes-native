import { NewScheduleHistory, ScheduleHistory } from '../../shared/types';

export type GetScheduleHistoryBySchedule = (
  scheduleId: ScheduleHistory['scheduleId'],
) => Promise<ScheduleHistory[]>;

export type CreateScheduleHistory = (
  data: NewScheduleHistory,
) => Promise<ScheduleHistory[]>;

export interface ScheduleHistoryServices {
  getBySchedule: GetScheduleHistoryBySchedule;
  create: CreateScheduleHistory;
}
