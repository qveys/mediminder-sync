import { supabase } from "@/integrations/supabase/client";
import { Medication, MedicationSchedule, MedicationTake } from "./types";

export async function getMedications() {
  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Medication[];
}

export async function createMedication(medication: Pick<Medication, "name" | "dosage">) {
  const { data, error } = await supabase
    .from("medications")
    .insert([medication])
    .select()
    .single();

  if (error) throw error;
  return data as Medication;
}

export async function getMedicationSchedules(medicationId: string) {
  const { data, error } = await supabase
    .from("medication_schedules")
    .select("*")
    .eq("medication_id", medicationId)
    .order("time", { ascending: true });

  if (error) throw error;
  return data as MedicationSchedule[];
}

export async function createMedicationSchedule(schedule: Pick<MedicationSchedule, "medication_id" | "time">) {
  const { data, error } = await supabase
    .from("medication_schedules")
    .insert([schedule])
    .select()
    .single();

  if (error) throw error;
  return data as MedicationSchedule;
}

export async function getMedicationTakes(medicationId: string) {
  const { data, error } = await supabase
    .from("medication_takes")
    .select("*")
    .eq("medication_id", medicationId)
    .order("scheduled_for", { ascending: false });

  if (error) throw error;
  return data as MedicationTake[];
}

export async function createMedicationTake(take: Pick<MedicationTake, "medication_id" | "scheduled_for">) {
  const { data, error } = await supabase
    .from("medication_takes")
    .insert([take])
    .select()
    .single();

  if (error) throw error;
  return data as MedicationTake;
}