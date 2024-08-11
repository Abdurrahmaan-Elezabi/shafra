import express from 'express';
import { ask } from './openai.js';

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/ask', async (req, res) => {
  const question = req.body.question;

  if (!question) {
    res.status(400).json({
      status: 'failure',
      answer: 'Question is required'
    });
  }

  try {
    const answer = await ask(question);
    res.status(200).json({
      status: 'success',
      answer
    });
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      answer: 'Unable to generate an answer'
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
