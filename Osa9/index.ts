import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'Height and weight must be inserted only in numerical form' });
    }

    if (!_req.query.height || !_req.query.weight) {
        return res.status(400).json({ error: 'Both height and weight must be set' });
      }

    const bmiResponse = calculateBmi(height, weight);

    return res.json({
        height,
        weight,
        bmi: bmiResponse
    });
});


interface ExerciseRequestBody {
    daily_exercises: number[];
    target: number;
  }

app.post('/exercises', (_req, res) => {
    console.log('Request Body:', _req.body);
    const { daily_exercises, target } =  _req.body as ExerciseRequestBody;

    if (isNaN(target)) {
        return res.status(400).json({ error: 'Malformatted parameters' });
    }
    
    if (!daily_exercises || !target) {
        return res.status(400).json({ error: 'Parameters missing' });
    }

    const result = calculateExercises(daily_exercises, target);
    
    return res.json({
    result
    });
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});