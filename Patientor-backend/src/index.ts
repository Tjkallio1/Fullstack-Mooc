import express from 'express';
import cors from 'cors'; 
import diagnoseRouter from './routes/diagnoserouter';
import patientRouter from './routes/patientrouter';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', cors(), (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', cors(), diagnoseRouter);

app.use('/api/patients', cors(), patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});