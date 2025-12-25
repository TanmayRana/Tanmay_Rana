import { Schema, model, models } from "mongoose";

const SkillsCategorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
  },
  { timestamps: true }
);

const SkillsCategory =
  models.SkillsCategory || model("SkillsCategory", SkillsCategorySchema);

export default SkillsCategory;
