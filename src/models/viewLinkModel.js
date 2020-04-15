import { Schema, model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const viewLinkSchema = new Schema({
  linkId: {
    required: true,
    type: ObjectId
  },
  timestamp: {
    required: true,
    unique: true,
    type: Date
  },
  userAgent: {
    required: true,
    type: String
  },
  ipAdd: {
    required: true,
    type: String
  }
});


viewLinkSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

export const ViewLinkModel = model('ViewLinkModel', viewLinkSchema);
