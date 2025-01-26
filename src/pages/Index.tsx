import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";
import { AddMedicationButton } from "@/components/AddMedicationButton";

const medications = [
  {
    id: 1,
    name: "Aspirine",
    time: "08:00",
    dosage: "1 comprimé",
    taken: false,
  },
  {
    id: 2,
    name: "Paracétamol",
    time: "12:00",
    dosage: "2 comprimés",
    taken: true,
  },
  {
    id: 3,
    name: "Vitamine C",
    time: "20:00",
    dosage: "1 comprimé",
    taken: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="space-y-3 animate-fade-in">
          <span className="text-sm font-medium text-muted-foreground">
            Aujourd'hui
          </span>
          <h2 className="text-2xl font-semibold">Vos médicaments</h2>
        </div>
        <div className="mt-8 grid gap-4 animate-slide-up">
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
      </main>
      <AddMedicationButton />
    </div>
  );
};

export default Index;