export interface Medication {
  id: string;
  name: string;
  dosage: string;
  created_at: string;
  updated_at: string;
}

export interface MedicationSchedule {
  id: string;
  medication_id: string;
  time: string;
  created_at: string;
  updated_at: string;
}

export interface MedicationTake {
  id: string;
  medication_id: string;
  scheduled_for: string;
  taken_at: string;
  created_at: string;
  updated_at: string;
}