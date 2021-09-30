import { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    label: String,
    url: String,
  },
  { timestamps: true }
);

export default model("Image", imageSchema);
