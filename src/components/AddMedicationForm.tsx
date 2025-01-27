import { useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  quantity: string;
};

const STEPS = [
  {
    title: "Quel médicament souhaitez-vous ajouter?",
    field: "name",
    type: "search",
    placeholder: "Rechercher ou saisir le nom de votre médicament",
  },
  {
    title: "Quelle est la forme du médicament ?",
    field: "dosage",
    type: "radio",
    options: [
      { label: "0.25mg Tablet", value: "0.25mg" },
      { label: "0.5mg Tablet", value: "0.5mg" },
      { label: "1mg Tablet", value: "1mg" },
      { label: "2mg Tablet", value: "2mg" },
      { label: "Autres", value: "other" },
    ],
  },
  {
    title: "À quelle fréquence prenez-vous le médicament ?",
    field: "frequency",
    type: "radio",
    options: [
      { label: "Une fois par jour", value: "1" },
      { label: "Deux fois par jour", value: "2" },
      { label: "3 fois par jour", value: "3" },
      { label: "4 fois par jour", value: "4" },
      { label: "Seulement au besoin", value: "asNeeded" },
      { label: "Autres", value: "other" },
    ],
  },
  {
    title: "Définir l'heure et la dose",
    field: "time",
    type: "time",
    subtitle: "Prendre 1 Pilule(s)",
  },
];

export const AddMedicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const currentStepData = STEPS[currentStep];
  const canGoNext = watch(currentStepData.field as keyof FormData);

  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#002133] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={goToPreviousStep}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-medium">
          {watch("name") && currentStep > 0
            ? `${watch("name")}, ${watch("dosage") || ""}`
            : "Ajouter un médicament"}
        </h1>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="rounded-none" />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col p-4 gap-6"
      >
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold leading-tight">
            {currentStepData.title}
          </h2>

          {currentStepData.type === "search" && (
            <div className="relative">
              <Input
                {...register(currentStepData.field as keyof FormData)}
                className="w-full bg-transparent border-[#0284C7] text-white placeholder:text-[#0284C7] rounded-xl p-4"
                placeholder={currentStepData.placeholder}
              />
            </div>
          )}

          {currentStepData.type === "radio" && (
            <RadioGroup
              onValueChange={(value) =>
                setValue(currentStepData.field as keyof FormData, value)
              }
              className="flex flex-col gap-4"
            >
              {currentStepData.options?.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center justify-between p-4 border-b border-gray-700"
                >
                  <label
                    htmlFor={option.value}
                    className="text-lg font-medium cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="text-white"
                  />
                </div>
              ))}
            </RadioGroup>
          )}

          {currentStepData.type === "time" && (
            <div className="flex flex-col gap-4">
              {currentStepData.subtitle && (
                <p className="text-lg">{currentStepData.subtitle}</p>
              )}
              <input
                type="time"
                {...register(currentStepData.field as keyof FormData)}
                className="bg-transparent text-white text-center text-4xl p-4"
              />
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={goToNextStep}
          disabled={!canGoNext}
          className="w-full bg-[#0284C7] hover:bg-[#0284C7]/90 text-white p-6 rounded-full text-lg"
        >
          {currentStep === STEPS.length - 1 ? "Enregistrer" : "Suivant"}
        </Button>
      </form>
    </div>
  );
};