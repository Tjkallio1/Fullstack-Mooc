import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});