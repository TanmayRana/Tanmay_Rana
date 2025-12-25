import { Schema, model, models } from "mongoose";

const CertificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    credentialUrl: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Certification =
  models.Certification || model("Certification", CertificationSchema);
