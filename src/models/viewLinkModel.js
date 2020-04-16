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
  user: {
    ipHash: {
      required: true,
      type: String
    },
    country: {
      required: true,
      type: String
    },
    city: {
      required: true,
      type: String
    }
  },
  agent: {
    browser: {
      name: {
        type: String,
      },
      version: {
        type: String,
      }
    },
    os: {
      name: {
        type: String
      },
      version: {
        type: String
      },
      versionName: {
        type: String
      }
    },
    platform: {
      type: {
        type: String
      }
    },
    engine: {
      name: {
        type: String
      }
    }
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
