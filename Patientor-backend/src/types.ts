export interface DiagnoseForm {
    code: string,
    name: string,
    latin?: string
}

export interface PatientForm {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NonSensitivePatientForm = Omit<PatientForm, 'ssn'>;