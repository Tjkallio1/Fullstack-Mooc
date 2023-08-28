/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  console.log('Reached the patientRouter');
  const patients = patientService.getNonSensitivePatientForm();
  res.send(patients);
});

patientRouter.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = {
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    };
    const newPatientaddition = patientService.addPatient(newPatient);
    res.json(newPatientaddition);
});

export default patientRouter;