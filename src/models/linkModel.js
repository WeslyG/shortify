import { Schema, model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const linkSchema = new Schema({
  originalLink: {
    required: true,
    type: String
  },
  hash: {
    required: true,
    unique: true,
    type: String
  },
  owner: {
    required: false,
    type: ObjectId
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
