import { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
