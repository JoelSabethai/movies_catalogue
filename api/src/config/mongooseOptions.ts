// libs
import type { ConnectOptions } from 'mongoose';
// Config
import { env } from '.';

interface MongoDBOptions {
  mongo_uri: string;
  dbName: string;
  host: string;
  port: number;
  username: string;
  password: string;
}

/* This code snippet is creating an object named `dbConfig` that contains properties for configuring a
MongoDB connection. Each property is being assigned a value from the `env` object, specifically
`mongodbName`, `mongodbHost`, `mongodbPort`, `mongodbUsername`, and `mongodbPassword`. The `port`
property is being converted to a number using `Number()` function. These values are likely
environment variables that hold the necessary information to connect to a MongoDB database. */
const dbConfig: MongoDBOptions = {
  mongo_uri: env.mongo_uri,
  dbName: env.mongodbName,
  host: env.mongodbHost,
  port: Number(env.mongodbPort),
  username: env.mongodbUsername,
  password: encodeURIComponent(env.mongodbPassword),
};

export const connectOptions: ConnectOptions = {
  // Keep trying to send operations for 5 seconds
  serverSelectionTimeoutMS: 5000,
  // Close sockets after 30 seconds of inactivity
  socketTimeoutMS: 30000,
  // Maintain up to 10 socket connections
  maxPoolSize: 10,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferCommands: false,
};

/**
 * The function `mongoURI` generates a MongoDB connection URI based on the provided database name,
 * host, port, username, and password.
 * @param  - It looks like the function `mongoURI` takes in an object with the following parameters:
 * `dbName`, `host`, `port`, `username`, and `password`. The function then constructs a MongoDB
 * connection URI using these parameters.
 * @returns The function `mongoURI` returns a MongoDB connection URI string based on the provided
 * parameters `dbName`, `host`, `port`, `username`, and `password`. The URI string includes the
 * credentials if `username` and `password` are provided, and it follows the format
 * `mongodb://username:password@host:port/dbName` or `mongodb://host:port/dbName` if credentials
 */
const mongoURI = (options: MongoDBOptions) => {
  const { mongo_uri, dbName, host, port, username, password } = options;

  if(mongo_uri) return mongo_uri;
  else {
    const credentials = username && password ? `${username}:${password}@` : '';
    const portStr = port ? `:${port}` : '';
    return `mongodb://${credentials}${host}${portStr}/${dbName}?authSource=admin`;
  }
};

export const MONGO_URI = mongoURI(dbConfig);
