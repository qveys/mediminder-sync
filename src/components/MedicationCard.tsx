import { Card } from "@/components/ui/card";
import { Pill, Clock, CheckCircle } from "lucide-react";

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
      className={`medication-card hover:shadow-xl transition-all duration-300 cursor-pointer ${
        taken ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-md">
            <Pill className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          </div>
        </div>
        {taken && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium bg-secondary px-3 py-1 rounded-full">
          {dosage}
        </span>
      </div>
    </Card>
  );
};