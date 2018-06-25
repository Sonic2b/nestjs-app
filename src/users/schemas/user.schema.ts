import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema(
  {
    username: String,
    phone: String,
    email: String,
    // MD5加密
    password: String,
    // 0 - 未激活 1 - 已激活 2 - 冻结帐号 3 - 销毁帐号
    status: Number,
    name: String,
    birthday: Date,
    // 0-未知 1-男 2-女
    sex: Number,
    qqOpenId: { type: String, alias: 'qq_open_id' },
    aliOpenId: { type: String, alias: 'ali_open_id' },
  },
  {
    // TODO 增加软删除操作
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
