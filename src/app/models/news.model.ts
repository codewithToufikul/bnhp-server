import { model, Schema } from "mongoose";

const NewsSchema = new Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String, required: true},
    summary: {type: String, required: true},
    fullContent: {type: String, required: true},
})

export const News = model("News", NewsSchema)