
import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  console.log('Reached the patientRouter');
  const patients = patientService.getNonSensitivePatientForm();
  res.send(patients);
});

export default patientRouter;