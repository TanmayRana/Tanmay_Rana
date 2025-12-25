import { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  email: String,
  phone: String,
  location: String,
});

export const Contact = models.Contact || model("Contact", contactSchema);
