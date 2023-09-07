import { v1 as uuid } from 'uuid';
import patientData from "../data/patients";
import { PatientForm, NonSensitivePatientForm, NewPatientForm } from "../types";

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
        ...newPatient
    };

    patients.push(newPatientaddition);
    return newPatientaddition;
};

export default {
    getPatients,
    getNonSensitivePatientForm,
    findById,
    addPatient
};