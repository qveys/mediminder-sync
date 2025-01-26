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

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getDayName = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date);
};

const Index = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  
  // Get the start of the week (Monday)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };

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

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-accent">
              Aujourd'hui, {today.getDate()} {new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(today)}
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
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className="text-xs text-muted uppercase">
                        {getDayName(date)}
                      </span>
                      <button
                        className={`px-4 py-2 rounded-full min-w-[3rem] ${
                          isToday(date)
                            ? "bg-accent text-white"
                            : "bg-secondary/20 text-muted"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    </div>
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