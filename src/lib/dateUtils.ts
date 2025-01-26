/**
 * Returns the number of days in a given month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Returns the formatted day name in French
 */
export const getDayName = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date);
};

/**
 * Returns the formatted month name in French
 */
export const formatMonthName = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date);
};

/**
 * Returns the start date of the week (Monday) for a given date
 */
export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

/**
 * Checks if a given date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};