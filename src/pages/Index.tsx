import {Header} from "@/components/Header";
import {WeekCalendar} from "@/components/WeekCalendar";
import {AddMedicationDialog} from "@/components/AddMedicationDialog";
import {useState} from "react";
import {useAuthCheck} from "@/hooks/use-auth.ts";
import {DateHandlerContainer} from "@/components/DateHandlerContainer";
import {TakesList} from "@/components/TakesList";

const Index = () => {
    useAuthCheck(); // Vérification de l'authentification
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 27));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-6">
            {/* Calendrier de la semaine */}
            <WeekCalendar initialDate={selectedDate} onDateSelect={handleDateSelect}/>

            {/* Conteneur de navigation par swipe et liste des prises */}
            <DateHandlerContainer selectedDate={selectedDate} onDateChange={setSelectedDate}>
                <TakesList selectedDate={selectedDate}/>
            </DateHandlerContainer>
        </div>
      </main>
      <AddMedicationDialog />
    </div>
  );
};

export default Index;