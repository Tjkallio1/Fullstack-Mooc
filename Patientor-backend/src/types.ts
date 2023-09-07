export interface DiagnoseForm {
    code: string,
    name: string,
    latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

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

export type NewPatientForm = Omit<PatientForm, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}