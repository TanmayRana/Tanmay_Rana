import { Schema, model, models } from "mongoose";

const ResumeSchema = new Schema({
  resumeUrl: String,
});
const Resume = models.Resume || model("Resume", ResumeSchema);
export default Resume;
