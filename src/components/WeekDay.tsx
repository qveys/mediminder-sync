import { getDayName } from "@/lib/dateUtils";

interface WeekDayProps {
  date: Date;
  isActive: boolean;
}

export const WeekDay = ({ date, isActive }: WeekDayProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted uppercase">
        {getDayName(date)}
      </span>
      <button
        className={`px-4 py-2 rounded-full min-w-[3rem] ${
          isActive
            ? "bg-accent text-white"
            : "bg-secondary/20 text-muted"
        }`}
      >
        {date.getDate()}
      </button>
    </div>
  );
};