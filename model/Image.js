import { Schema, model, models } from "mongoose";

const imageSchema = new Schema(
  {
    label: String,
    url: String,
  },
  { timestamps: true }
);
const Model = models.Image || model("Image", imageSchema);
export default Model;
