// models/Profile.ts
import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    roles: {
      type: [String],
    },
    expertise: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    greeting: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite on hot reload in development
const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;
