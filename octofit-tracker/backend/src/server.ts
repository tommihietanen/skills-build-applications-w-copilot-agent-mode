import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors({
  origin: codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173',
}));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiBaseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

mongoose.connect(connectionString)
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${apiBaseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });