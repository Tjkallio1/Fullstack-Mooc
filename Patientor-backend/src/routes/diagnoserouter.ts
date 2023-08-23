import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  console.log('Reached the diagnoseRouter');
  const diagnoses = diagnoseService.getDiagnoses();
  res.send(diagnoses);
});

export default diagnoseRouter;