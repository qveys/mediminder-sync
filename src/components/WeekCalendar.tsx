import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { WeekDay } from "./WeekDay";
import { getStartOfWeek, formatMonthName, isToday } from "@/lib/dateUtils";

interface WeekCalendarProps {
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const WeekCalendar = ({ 
  initialDate = new Date(2025, 0, 27), 
  onDateSelect 
}: WeekCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const startOfWeek = getStartOfWeek(new Date(currentDate));

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-accent">
        Aujourd'hui, {initialDate.getDate()} {formatMonthName(initialDate)}
      </span>
      <div className="flex w-screen -mx-4 px-4 overflow-x-auto py-2">
        <div className="flex w-full items-center justify-between min-w-full px-4">
          <button
            onClick={handlePreviousWeek}
            className="p-2 rounded-full hover:bg-secondary/20"
            aria-label="Semaine précédente"
          >
            <ChevronLeft className="w-5 h-5 text-muted" />
          </button>
          <div className="flex justify-between flex-1 px-4">
            {weekDays.map((date, i) => (
              <WeekDay 
                key={i} 
                date={date} 
                isActive={isToday(date)}
                isSelected={selectedDate.getDate() === date.getDate() && 
                           selectedDate.getMonth() === date.getMonth() && 
                           selectedDate.getFullYear() === date.getFullYear()}
                onClick={() => handleDateSelect(date)}
              />
            ))}
          </div>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-full hover:bg-secondary/20"
            aria-label="Semaine suivante"
          >
            <ChevronRight className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </div>
  );
};