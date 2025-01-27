import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";
import { WeekCalendar } from "@/components/WeekCalendar";
import { AddMedicationDialog } from "@/components/AddMedicationDialog";
import { useQuery } from "@tanstack/react-query";
import { getMedications, getMedicationTakes } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Index = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 27));
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || isAnimating) return;
    
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${-diff}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || isAnimating) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    // Si le swipe est suffisamment long (100px)
    if (Math.abs(diff) > 100) {
      setIsAnimating(true);
      const newDate = new Date(selectedDate);
      
      if (diff > 0) {
        // Swipe vers la gauche -> jour suivant
        newDate.setDate(selectedDate.getDate() + 1);
      } else {
        // Swipe vers la droite -> jour précédent
        newDate.setDate(selectedDate.getDate() - 1);
      }
      
      setSelectedDate(newDate);
      
      // Reset après l'animation
      setTimeout(() => {
        setIsAnimating(false);
        if (containerRef.current) {
          containerRef.current.style.transform = '';
        }
      }, 300);
    } else {
      // Pas assez de swipe, on revient à la position initiale
      if (containerRef.current) {
        containerRef.current.style.transform = '';
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
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
            className="overflow-hidden"
            style={{ height: takes?.length === 0 ? '120px' : 'auto' }}
          >
            <div
              ref={containerRef}
              className="grid gap-3 transition-transform duration-300 ease-in-out touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
        </div>
      </main>
      <AddMedicationDialog />
    </div>
  );
};

export default Index;