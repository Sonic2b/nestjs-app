import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema(
  {
    pin: String,
    phone: String,
    password: String,
    email: String,
    status: Number,
    name: String,
    birthday: Date,
    sex: Number,
    qqOpenId: { type: String, alias: 'qq_open_id' },
    aliOpenId: { type: String, alias: 'ali_open_id' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
