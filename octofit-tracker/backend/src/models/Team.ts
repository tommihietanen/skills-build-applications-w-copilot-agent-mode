import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true },
);

export const TeamModel = model('Team', teamSchema);