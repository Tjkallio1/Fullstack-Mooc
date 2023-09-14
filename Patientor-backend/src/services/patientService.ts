import { v1 as uuid } from 'uuid';
import patientData from "../data/patients";
import { PatientForm, NonSensitivePatientForm, NewPatientForm, BaseEntry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, Entry } from "../types";

const patients: PatientForm[] = patientData;

// this has ssn as well, NOT SENSITIVE
const getPatients = (): PatientForm[] => {
    return patients;
};

// excludes ssn, USE THIS 
const getNonSensitivePatientForm = (): NonSensitivePatientForm[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const findById = (id: string): PatientForm | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
  };

const addPatient = (newPatient: NewPatientForm) : PatientForm => {
    const newPatientaddition = {
        id: uuid(),
        ...newPatient,
        entries: []
    };

    console.log("New Patient Data:", newPatientaddition);
    patients.push(newPatientaddition);
    return newPatientaddition;
};

const createCommonEntry = (newEntry: Entry): BaseEntry => {
    return {
      id: uuid(),
      description: newEntry.description,
      date: newEntry.date,
      specialist: newEntry.specialist,
      diagnosisCodes: newEntry.diagnosisCodes,
    };
  };
  
  const addEntry = (patientId: string, newEntry: Entry): PatientForm | undefined => {
    const patientIndex = patients.findIndex((patient) => patient.id === patientId);
  
    if (patientIndex !== -1) {
      const patient = patients[patientIndex];

        switch (newEntry.type) {
        
          case 'Hospital':
          const hospitalEntry: HospitalEntry = {
            ...createCommonEntry(newEntry),
            type: 'Hospital',
            discharge: newEntry.discharge,
          };
          patient.entries.push(hospitalEntry);
          return patient;
        
          case 'OccupationalHealthcare':
          const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
            ...createCommonEntry(newEntry),
            type: 'OccupationalHealthcare',
            employerName: newEntry.employerName,
            sickLeave: newEntry.sickLeave,
          };
          patient.entries.push(occupationalHealthcareEntry);
          return patient;
        
          case 'HealthCheck':
          const commonEntry = createCommonEntry(newEntry);
          const healthCheckEntry: HealthCheckEntry = {
            ...commonEntry,
            type: 'HealthCheck',
            healthCheckRating: newEntry.healthCheckRating,
          };
          patient.entries.push(healthCheckEntry);
          return patient;
        default:
          throw new Error(`Invalid entry type: ${(newEntry as Entry).type}`);
      }
    }
    return undefined; 
  };

export default {
    getPatients,
    getNonSensitivePatientForm,
    findById,
    addPatient,
    addEntry
};