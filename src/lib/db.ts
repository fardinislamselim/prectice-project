import { connect } from "mongoose";

interface MongoCache {
  conn: typeof import("mongoose").connection | null;
  promise: Promise<typeof import("mongoose").connection> | null;
}

declare global {
  var mongoose: MongoCache;
}

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("Mongodb URL is not defined in .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    console.log("cached DB connected");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = connect(mongodbUrl).then((c) => c.connection);
  }
  try {
    cached.conn = await cached.promise;
    console.log("DB connected");
  } catch (error) {
    throw error;
  }
  return cached.conn;
};

export default connectDb;
