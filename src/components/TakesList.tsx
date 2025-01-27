import {MedicationCard} from "@/components/MedicationCard.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useQuery} from "@tanstack/react-query";
import {getMedications, getMedicationTakes} from "@/lib/api.ts";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

interface TakesListProps {
    selectedDate: Date;
}

export const TakesList: React.FC<TakesListProps> = ({selectedDate}) => {
    const {data: medications, isLoading: isMedicationsLoading} = useQuery({
        queryKey: ["medications"],
        queryFn: getMedications,
    });

    const {data: takes, isLoading: isTakesLoading} = useQuery({
        queryKey: ["takes", selectedDate],
        queryFn: async () => {
            if (!medications) return [];
            const allTakes = await Promise.all(
                medications.map((med) => getMedicationTakes(med.id))
            );

            return allTakes.flat().filter((take) => {
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
    const getMedicationById = (id: string) => medications?.find((med) => med.id === id);

    if (isLoading) {
        return Array.from({length: 3}).map((_, i) => (
            <div key={i} className="w-full h-24">
                <Skeleton className="w-full h-full"/>
            </div>
        ));
    }

    if (!takes?.length) {
        return <div className="text-center py-8 text-muted-foreground">
            Aucun médicament prévu pour le {format(selectedDate, "d MMMM yyyy", {locale: fr})}.
        </div>;
    }

    return (
        <div className="grid gap-3">
            {takes.map((take) => {
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
            })}
        </div>
    );
};