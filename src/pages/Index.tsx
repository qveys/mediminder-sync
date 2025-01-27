import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";
import { WeekCalendar } from "@/components/WeekCalendar";
import { AddMedicationDialog } from "@/components/AddMedicationDialog";
import { useQuery } from "@tanstack/react-query";
import { getMedications, getMedicationTakes } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Index = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 27));
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: medications, isLoading: isMedicationsLoading } = useQuery({
    queryKey: ["medications"],
    queryFn: getMedications,
  });

  const { data: takes, isLoading: isTakesLoading } = useQuery({
    queryKey: ["takes", selectedDate],
    queryFn: async () => {
      if (!medications) return [];
      
      const allTakes = await Promise.all(
        medications.map(med => getMedicationTakes(med.id))
      );
      
      return allTakes.flat().filter(take => {
        const takeDate = new Date(take.scheduled_for);
        return (
          takeDate.getDate() === selectedDate.getDate() &&
          takeDate.getMonth() === selectedDate.getMonth() &&
          takeDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    },
    enabled: !!medications,
  });

  const isLoading = isMedicationsLoading || isTakesLoading;

  const getMedicationById = (id: string) => {
    return medications?.find(med => med.id === id);
  };

  const handleDateSelect = (date: Date, isPrevious: boolean) => {
    setSlideDirection(isPrevious ? 'right' : 'left');
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-6">
          <WeekCalendar 
            initialDate={selectedDate} 
            onDateSelect={handleDateSelect}
          />
          <div 
            key={selectedDate.toISOString()}
            className={`grid gap-3 ${
              slideDirection === 'left' ? 'animate-slide-left' : 
              slideDirection === 'right' ? 'animate-slide-right' : ''
            }`}
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full h-24">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            ) : takes?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun médicament prévu pour le {format(selectedDate, "d MMMM yyyy", { locale: fr })}.
              </div>
            ) : (
              takes?.map((take) => {
                const medication = getMedicationById(take.medication_id);
                if (!medication) return null;
                
                return (
                  <MedicationCard
                    key={take.id}
                    name={medication.name}
                    time={format(new Date(take.scheduled_for), "HH:mm")}
                    dosage={medication.dosage}
                    taken={!!take.taken_at}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
      <AddMedicationDialog />
    </div>
  );
};

export default Index;