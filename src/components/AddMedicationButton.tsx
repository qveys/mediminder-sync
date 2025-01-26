import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AddMedicationButton = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
      size="icon"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
};