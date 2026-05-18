export interface IStreak {
  ranking: any;
  available_freeze_count: number;
  freeze_info: any;
  daily_plan: IDailyPlan;
  current_streak: ICurrentStreak;
  next_goal_badge: INextGoalBadge;
  week_days: IWeekDay[];
}

export interface IDailyPlan {
  daily_streak_time: number;
  user_todays_read_time: number;
  daily_remaining_streak_time: number;
  progress_percent: number;
  daily_streak_coin: number;
}

export interface ICurrentStreak {
  day: number;
}

export interface INextGoalBadge {
  id: number;
  name: string;
  is_first: boolean;
}

export interface IWeekDay {
  date: string;
  status: string;
}

export interface IBadgeWrapper {
  name: string;
  items: IBadge[];
}

export interface IBadge {
  id: number;
  name: string;
  description: string;
  required_time: number;
  required_time_unit: string;
  required_time_in_days: number;
  award_coin_amount: number;
  image_completed: string;
  image_progress: string;
  image_inactive: string;
  is_obtained: boolean;
  percent: number;
}

export interface IActivityDetail {
  streak_days: number;
  gained_coin_amount: number;
  next_goal_badge: INextGoalBadge;
  start_date: any;
}

export interface ICalendar {
  year: number;
  month: number;
  total_days: number;
  total_completed_days: number;
  days: IWeekDay[];
}

export interface ICoinsPackage {
  id: number
  freeze_count: number
  coin_cost: number
}
