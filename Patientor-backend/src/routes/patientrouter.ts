import express from 'express';
import patientService from '../services/patientService';
import { Entry, NewEntryForm } from '../types';
import { toNewPatientForm, toNewEntryForm } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  console.log('Reached the patientRouter');
  const patients = patientService.getNonSensitivePatientForm();
  res.send(patients);
});

patientRouter.get('/:id', (req, res) => {
    const patient = patientService.findById(String(req.params.id));

    if(patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

patientRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientForm(req.body);
        const newPatientaddition = patientService.addPatient(newPatient);
        res.json(newPatientaddition);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

patientRouter.post('/:id/entries', (req, res) => {  
    const patientId = req.params.id;
    const entryData= req.body as NewEntryForm;
    try {
      const newEntry = toNewEntryForm(entryData) as Entry; 
      const updatedPatient = patientService.addEntry(patientId, newEntry);
  
      if (updatedPatient) {
        return res.status(201).json(updatedPatient);
      } else {
        return res.status(404).json({ error: 'Patient not found' });
      }
    } catch (error: unknown) {
      let errorMessage = 'Incorrect data for new entry.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      return res.status(400).json({ error: errorMessage });
    }
  });

export default patientRouter;