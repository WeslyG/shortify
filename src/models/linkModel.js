import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
  originalLink: {
    required: true,
    type: String
  },
  hash: {
    required: true,
    unique: true,
    type: String
  }
});

linkSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

export const LinkModel = model('LinkModel', linkSchema);
