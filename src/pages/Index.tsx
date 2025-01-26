import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const medications = [
  {
    id: 1,
    name: "Albuterol",
    time: "08:20",
    dosage: "2 serre, prendre 1",
    taken: true,
  },
  {
    id: 2,
    name: "Simvastatin",
    time: "12:00",
    dosage: "5 mg, prendre 1 avec repas",
    taken: false,
  },
  {
    id: 3,
    name: "Loratadine",
    time: "18:30",
    dosage: "10 mg, prendre 1 avec repas",
    taken: false,
  },
  {
    id: 4,
    name: "Montelukast",
    time: "18:30",
    dosage: "10 mg, prendre 1 avec repas",
    taken: false,
  },
];

const getDayName = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date);
};

const getDateFromDayNumber = (dayNumber: number) => {
  const date = new Date();
  date.setDate(dayNumber);
  return date;
};

const isValidDayInMonth = (dayNumber: number) => {
  const date = getDateFromDayNumber(dayNumber);
  const currentMonth = date.getMonth();
  const nextDate = new Date(date);
  nextDate.setDate(dayNumber + 1);
  
  return nextDate.getMonth() === currentMonth;
};

const Index = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(24);

  const handlePreviousWeek = () => {
    const newStart = currentWeekStart - 7;
    if (newStart >= 1) {
      setCurrentWeekStart(newStart);
    }
  };

  const handleNextWeek = () => {
    const lastDayOfMonth = new Date(
      getDateFromDayNumber(currentWeekStart).getFullYear(),
      getDateFromDayNumber(currentWeekStart).getMonth() + 1,
      0
    ).getDate();
    
    const newStart = currentWeekStart + 7;
    if (newStart <= lastDayOfMonth) {
      setCurrentWeekStart(newStart);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-accent">
              Aujourd'hui, 24 septembre
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
                  {Array.from({ length: 7 }).map((_, i) => {
                    const currentDay = currentWeekStart + i;
                    const isValidDay = isValidDayInMonth(currentDay);
                    const currentDate = getDateFromDayNumber(currentDay);

                    if (!isValidDay) return null;

                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-xs text-muted uppercase">
                          {getDayName(currentDate)}
                        </span>
                        <button
                          className={`px-4 py-2 rounded-full min-w-[3rem] ${
                            i === 2
                              ? "bg-accent text-white"
                              : "bg-secondary/20 text-muted"
                          }`}
                        >
                          {currentDay}
                        </button>
                      </div>
                    );
                  })}
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
          <div className="grid gap-3">
            {medications.map((med) => (
              <MedicationCard
                key={med.id}
                name={med.name}
                time={med.time}
                dosage={med.dosage}
                taken={med.taken}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;