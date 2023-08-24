import patientData from "../data/patients";
import { PatientForm, NonSensitivePatientForm } from "../types";

const patients: PatientForm[] = patientData;

// this has ssn as well, NOT SENSITIVE
const getPatients = (): PatientForm[] => {
    return patients;
};

// excludes ssn, USE THIS 
const getNonSensitivePatientForm = (): NonSensitivePatientForm[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getNonSensitivePatientForm
};