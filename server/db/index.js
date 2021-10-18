import mongoose from "mongoose";

let isConnected;
let db;

const connectDB = async () => {
  if (isConnected) return db;

  try {
    db = await mongoose.connect(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    isConnected = db.connections[0].readyState;
    return db;
  } catch (err) {
    throw new Error(err);
  }
};

export default connectDB;
