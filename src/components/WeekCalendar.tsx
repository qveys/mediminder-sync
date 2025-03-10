import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { WeekDay } from "./WeekDay";
import { getStartOfWeek, formatMonthName, isToday } from "@/lib/dateUtils";
import { Button } from "./ui/button";

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

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    onDateSelect?.(today);
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const isTodaySelected = isToday(selectedDate);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center px-4 relative h-10">
        <span className="text-sm font-medium text-accent absolute left-1/2 -translate-x-1/2">
          {isTodaySelected ? "Aujourd'hui, " : ""}{initialDate.getDate()} {formatMonthName(initialDate)}
        </span>
        {!isTodaySelected && (
          <div className="ml-auto">
            <Button 
              variant="ghost" 
              className="text-sm font-medium text-accent hover:text-accent/80"
              onClick={handleTodayClick}
            >
              &lt;&lt; Aujourd'hui
            </Button>
          </div>
        )}
      </div>
      <div className="flex overflow-hidden px-2">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={handlePreviousWeek}
            className="p-2 rounded-full hover:bg-secondary/20 flex-shrink-0"
            aria-label="Semaine précédente"
          >
            <ChevronLeft className="w-5 h-5 text-muted" />
          </button>
          <div className="flex justify-between flex-1 px-2">
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
            className="p-2 rounded-full hover:bg-secondary/20 flex-shrink-0"
            aria-label="Semaine suivante"
          >
            <ChevronRight className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </div>
  );
};