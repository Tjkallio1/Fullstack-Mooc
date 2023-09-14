export interface DiagnoseForm {
    code: string,
    name: string,
    latin?: string
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseForm['code']>;
  }

export enum HealthCheckRating {
"Healthy" = 0,
"LowRisk" = 1,
"HighRisk" = 2,
"CriticalRisk" = 3
}

export interface HospitalEntry extends BaseEntry {
type: "Hospital";
discharge: {
    date: string,
    criteria: string,
}
}

export interface OccupationalHealthcareEntry extends BaseEntry {
type: "OccupationalHealthcare";
employerName: string,
sickLeave?: {
    startDate: string,
    endDate: string,
    }
}

export interface HealthCheckEntry extends BaseEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
}

export enum EntryType {
Hospital = 'Hospital',
OccupationalHealthcare = 'OccupationalHealthcare',
HealthCheck = 'HealthCheck'
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export interface PatientForm {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type NonSensitivePatientForm = Omit<PatientForm, 'ssn' | 'entries'>;

export type NewPatientForm = Omit<PatientForm, 'id' >;

export type NewEntryForm =
| Omit<BaseEntry, 'id'>
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}