import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";
import { WeekCalendar } from "@/components/WeekCalendar";

// Sample data - could be moved to a separate file or fetched from an API
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-6">
          <WeekCalendar initialDate={new Date()} />
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