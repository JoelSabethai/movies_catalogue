// Libs
import mongoose from 'mongoose';
// Middleware
import { log } from '../middlewares/logger';
// Config
import { MONGO_URI, connectOptions } from '../config/mongooseOptions';

export const connectDB = async () => {
  try {
    mongoose.connection.on('connecting', () => {
      log.info('Connecting to MongoDB...');
    });

    mongoose.connection.on('connected', () => {
      log.info('Connected to MongoDB');
      if (mongoose.connection.readyState === 1) {
        log.info('Mongoose healthcheck passed');
      } else {
        log.error('Mongoose healthcheck failed');
      }
    });

    mongoose.connection.on('disconnected', () => {
      log.error('Lost MongoDB connection...');
      // Attempt to reconnect
      if (mongoose.connection.readyState) {
        log.info('Reconnecting to MongoDB...');
        mongoose.connect(MONGO_URI, connectOptions);
      }
    });

    mongoose.connection.on('error', (err) => {
      log.error('MongoDB connection error:', err);
    });

    // Initial connection
    await mongoose.connect(MONGO_URI, connectOptions);
  } catch (err) {
    log.error('Error connecting to MongoDB:', err);
    // Attempt to reconnect
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};
