import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(" ✅MongoDB Connected");
  } catch (error) {
    console.error(" ❌MongoDB Connection Error", error);
    process.exit(1);
  }
}

// export default connectToDB;

// lib/mongoose.ts
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!; // Ensure this is set in .env.local

// export const connectToDB = async () => {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw new Error("Connection failed");
//   }
// };

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in .env.local");
// }

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectToDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   console.log("MongoDB connected");

//   return cached.conn;
// }
