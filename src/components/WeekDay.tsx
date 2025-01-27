import {getDayName} from "@/lib/dateUtils";

interface WeekDayProps {
  date: Date;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const WeekDay = ({ date, isActive, isSelected, onClick }: WeekDayProps) => {
  return (
    <div 
      className="flex flex-col items-center gap-1 cursor-pointer" 
      onClick={onClick}
    >
      <span className={`text-xs uppercase ${isActive && 'text-accent'}`}>
        {getDayName(date)}
      </span>
      <button
        className={`px-4 py-2 rounded-full min-w-[3rem] ${
          isSelected
            ? "bg-accent text-white"
            : isActive
            ? "bg-accent/20 text-accent"
                  : "bg-secondary/20"
        }`}
      >
        {date.getDate()}
      </button>
    </div>
  );
};