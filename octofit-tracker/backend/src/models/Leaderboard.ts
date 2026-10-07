import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weeklyStreak: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);