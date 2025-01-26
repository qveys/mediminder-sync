import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";
import { WeekCalendar } from "@/components/WeekCalendar";
import { AddMedicationDialog } from "@/components/AddMedicationDialog";
import { useQuery } from "@tanstack/react-query";
import { getMedications } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: medications, isLoading } = useQuery({
    queryKey: ["medications"],
    queryFn: getMedications,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-6">
          <WeekCalendar initialDate={new Date()} />
          <div className="grid gap-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full h-24">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            ) : medications?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun médicament ajouté pour le moment.
              </div>
            ) : (
              medications?.map((med) => (
                <MedicationCard
                  key={med.id}
                  name={med.name}
                  time="08:00"
                  dosage={med.dosage}
                  taken={false}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <AddMedicationDialog />
    </div>
  );
};

export default Index;