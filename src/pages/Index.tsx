import { Header } from "@/components/Header";
import { MedicationCard } from "@/components/MedicationCard";

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
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-accent">
              Aujourd'hui, 24 septembre
            </span>
            <div className="flex w-screen -mx-4 px-4 overflow-x-auto py-2">
              <div className="flex w-full justify-between min-w-full">
                {Array.from({ length: 7 }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full min-w-[3rem] ${
                      i === 2
                        ? "bg-accent text-white"
                        : "bg-secondary/20 text-muted"
                    }`}
                  >
                    {24 + i}
                  </button>
                ))}
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