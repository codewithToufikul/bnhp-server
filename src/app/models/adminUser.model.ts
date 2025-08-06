import { model, Schema } from "mongoose";

const AdminUserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value); // regex explained below
      },
      message: props => `Password is too weak. It must be at least 8 characters long and contain at least one letter and one number.`
    }
  }
});

export const AdminUser = model("AdminUser", AdminUserSchema)