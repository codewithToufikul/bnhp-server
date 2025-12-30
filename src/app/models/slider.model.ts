import { model, Schema } from "mongoose";

const sliderSchema = new Schema({
    src: {type: String, required: true},
    title:{type: String, required: true},
    description: {type: String, required: true}
})

export const Slider = model("Slider", sliderSchema); 