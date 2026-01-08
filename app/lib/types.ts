export interface WeightLog {
  id: string;
  date: string; // YYYY-MM-DD format
  sleep_hours: number;
  weight: number;
  created_at?: string;
  updated_at?: string;
}

export interface WeightLogInput {
  date: string;
  sleep_hours: number;
  weight: number;
}

export interface WeightLogWithCalculations extends WeightLog {
  avg_sleep_7days: number;
  avg_weight_7days: number;
  bmi: number;
}

export interface UserSettings {
  id?: string;
  setting_key: string;
  setting_value: string;
}
