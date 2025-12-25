import { Schema, model, models } from "mongoose";

const TechnologieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const Technologie =
  models.Technologie || model("Technologie", TechnologieSchema);

export default Technologie;
