import { supabase } from './supabase';
import { WeightLog, WeightLogInput, WeightLogWithCalculations } from './types';

const DEFAULT_HEIGHT_CM = 170;

/**
 * Get user's height setting from Supabase
 */
export async function getHeight(): Promise<number> {
  const { data, error } = await supabase
    .from('user_settings')
    .select('setting_value')
    .eq('setting_key', 'height')
    .single();

  if (error || !data) {
    return DEFAULT_HEIGHT_CM;
  }

  return parseFloat(data.setting_value);
}

/**
 * Update user's height setting in Supabase
 */
export async function updateHeight(height: number): Promise<void> {
  const { error } = await supabase
    .from('user_settings')
    .upsert({ setting_key: 'height', setting_value: height.toString() }, { onConflict: 'setting_key' });

  if (error) {
    throw new Error(`Failed to save height: ${error.message}`);
  }
}

/**
 * Calculate BMI
 */
export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

/**
 * Get all weight logs with calculations
 */
export async function getWeightLogs(): Promise<WeightLogWithCalculations[]> {
  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch weight logs: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const height = await getHeight();

  // Sort by date ascending for calculations
  const sortedData = [...data].reverse();

  // Calculate 7-day averages and BMI
  return sortedData.map((log, index) => {
    // Get last 7 days including current
    const last7Days = sortedData.slice(Math.max(0, index - 6), index + 1);

    const avg_sleep_7days = last7Days.reduce((sum, l) => sum + l.sleep_hours, 0) / last7Days.length;
    const avg_weight_7days = last7Days.reduce((sum, l) => sum + l.weight, 0) / last7Days.length;
    const bmi = calculateBMI(avg_weight_7days, height);

    return {
      ...log,
      avg_sleep_7days: Math.round(avg_sleep_7days * 10) / 10,
      avg_weight_7days: Math.round(avg_weight_7days * 100) / 100,
      bmi: Math.round(bmi * 100) / 100,
    };
  }).reverse(); // Reverse back to descending order
}

/**
 * Get a single weight log by date
 */
export async function getWeightLogByDate(date: string): Promise<WeightLog | null> {
  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('date', date)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Create or update a weight log
 */
export async function upsertWeightLog(input: WeightLogInput): Promise<WeightLog> {
  const { data, error } = await supabase
    .from('weight_logs')
    .upsert({
      date: input.date,
      sleep_hours: input.sleep_hours,
      weight: input.weight,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save weight log: ${error.message}`);
  }

  return data;
}

/**
 * Delete a weight log
 */
export async function deleteWeightLog(date: string): Promise<void> {
  const { error } = await supabase
    .from('weight_logs')
    .delete()
    .eq('date', date);

  if (error) {
    throw new Error(`Failed to delete weight log: ${error.message}`);
  }
}
