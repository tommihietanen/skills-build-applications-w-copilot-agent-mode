import mongoose from 'mongoose';
import { ActivityModel as activity } from '../models/Activity';
import { LeaderboardModel as leaderboard } from '../models/Leaderboard';
import { TeamModel as team } from '../models/Team';
import { UserModel as user } from '../models/User';
import { WorkoutModel as workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      activity.deleteMany({}),
      leaderboard.deleteMany({}),
      team.deleteMany({}),
      user.deleteMany({}),
      workout.deleteMany({}),
    ]);

    const [alex, priya, jordan, sam] = await user.create([
      {
        username: 'alex-rivera',
        displayName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        fitnessLevel: 'Intermediate',
        goals: ['Run a 10K', 'Improve mobility'],
      },
      {
        username: 'priya-shah',
        displayName: 'Priya Shah',
        email: 'priya.shah@example.com',
        fitnessLevel: 'Advanced',
        goals: ['Build strength', 'Maintain weekly streak'],
      },
      {
        username: 'jordan-lee',
        displayName: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        fitnessLevel: 'Beginner',
        goals: ['Create a routine', 'Increase endurance'],
      },
      {
        username: 'sam-taylor',
        displayName: 'Sam Taylor',
        email: 'sam.taylor@example.com',
        fitnessLevel: 'Intermediate',
        goals: ['Improve cycling power', 'Add core training'],
      },
    ]);

    await team.create([
      {
        name: 'Octo Striders',
        motto: 'Every step counts.',
        members: [alex._id, jordan._id],
      },
      {
        name: 'Core Commanders',
        motto: 'Strong reps, stronger team.',
        members: [priya._id, sam._id],
      },
    ]);

    await activity.create([
      {
        user: alex._id,
        type: 'Run',
        durationMinutes: 42,
        distanceKm: 7.1,
        caloriesBurned: 510,
        performedAt: new Date('2026-10-05T07:30:00Z'),
      },
      {
        user: priya._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 430,
        performedAt: new Date('2026-10-05T18:15:00Z'),
      },
      {
        user: jordan._id,
        type: 'Walk',
        durationMinutes: 35,
        distanceKm: 3.2,
        caloriesBurned: 180,
        performedAt: new Date('2026-10-06T12:10:00Z'),
      },
      {
        user: sam._id,
        type: 'Cycling',
        durationMinutes: 64,
        distanceKm: 24.6,
        caloriesBurned: 720,
        performedAt: new Date('2026-10-06T16:40:00Z'),
      },
    ]);

    await leaderboard.create([
      { user: sam._id, rank: 1, points: 2840, weeklyStreak: 8 },
      { user: priya._id, rank: 2, points: 2660, weeklyStreak: 6 },
      { user: alex._id, rank: 3, points: 2195, weeklyStreak: 5 },
      { user: jordan._id, rank: 4, points: 1320, weeklyStreak: 3 },
    ]);

    await workout.create([
      {
        title: 'Morning Mobility Flow',
        focus: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow stretch', 'World greatest stretch', 'Hip airplanes', 'Thoracic rotations'],
      },
      {
        title: '10K Builder Intervals',
        focus: 'Running',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        exercises: ['Warm-up jog', '6 x 400m intervals', 'Easy recovery jog', 'Cooldown walk'],
      },
      {
        title: 'Power Core Circuit',
        focus: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 32,
        exercises: ['Plank shoulder taps', 'Dead bugs', 'Kettlebell swings', 'Side plank reach-throughs'],
      },
      {
        title: 'Climb Ready Ride',
        focus: 'Cycling',
        difficulty: 'Advanced',
        durationMinutes: 60,
        exercises: ['Cadence warm-up', 'Hill repeats', 'Tempo block', 'Easy spin cooldown'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
