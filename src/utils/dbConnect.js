import mongoose from 'mongoose';
import {
  MONGO_DB_NAME,
  MONGO_URL,
  MONGO_USER,
  MONGO_PASSWORD
} from '../../config';


export const connectMongo = async () => {
  let connect = '';
  if (MONGO_USER && MONGO_PASSWORD) {
    connect = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB_NAME}`;
  } else {
    connect = `mongodb://${MONGO_URL}/${MONGO_DB_NAME}`;
  }
  try {
    await mongoose.connect(connect, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      autoIndex: true,
      // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      // reconnectInterval: 500, // Reconnect every 500ms
      bufferMaxEntries: 0,
      // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log(`MongoDB connected to ${connect}`);
  } catch (err) {
    console.log(err);
  }
};

// export const disconnectMongo = async () => {
//   try
// }
