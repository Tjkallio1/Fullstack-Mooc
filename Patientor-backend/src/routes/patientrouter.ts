import express from 'express';
import patientService from '../services/patientService';
import toNewPatientForm from '../utils';

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

export default patientRouter;