import { model, Schema } from "mongoose";

const blogSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  summary: { type: String, required: true },
  image: { type: String, required: true },
  tags: {
    type: [String], 
    required: true,
  },
  content: { type: String, required: true },
});

export const Blog = model("Blog", blogSchema);
