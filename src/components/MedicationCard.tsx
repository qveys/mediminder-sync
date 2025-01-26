import { Card } from "@/components/ui/card";
import { Pill, Clock, CheckCircle, MoreHorizontal } from "lucide-react";

interface MedicationCardProps {
  name: string;
  time: string;
  dosage: string;
  taken?: boolean;
  onClick?: () => void;
}

export const MedicationCard = ({
  name,
  time,
  dosage,
  taken = false,
  onClick,
}: MedicationCardProps) => {
  return (
    <Card
      className={`p-4 hover:bg-secondary/10 transition-all duration-300 cursor-pointer ${
        taken ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-accent/10 rounded-full">
            <Pill className="w-5 h-5 text-accent" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="font-medium text-base text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{dosage}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {taken ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Clock className="w-5 h-5 text-accent" />
          )}
          <span className="text-sm font-medium text-accent">{time}</span>
          <button className="p-1 hover:bg-secondary/20 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </Card>
  );
};