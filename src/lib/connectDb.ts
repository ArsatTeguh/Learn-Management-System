import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri as string, opts).then((mongo) => {
      console.log('Connected to database!');
      return mongo;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectMongoDB;
