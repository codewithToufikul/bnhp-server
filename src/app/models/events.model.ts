import { model, Schema } from "mongoose";

const EventsSchema = new Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    testimonial: {type: String, required: true},
    donation: {type: String, required: true},
    politicalUpdate: {type: String, required: true}
})

export const Event = model("Events", EventsSchema);