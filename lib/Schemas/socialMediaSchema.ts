import { Schema, model, models } from "mongoose";

const socialMediaSchema = new Schema({
  githunurl: String,
  linkedinurl: String,
  twitterurl: String,
});

export const SocialMedia =
  models.SocialMedia || model("SocialMedia", socialMediaSchema);
