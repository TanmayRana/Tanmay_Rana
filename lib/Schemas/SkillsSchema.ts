import { Schema, models, model } from "mongoose";

const SkillsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "SkillsCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skills = models.Skills || model("Skills", SkillsSchema);

export default Skills;
