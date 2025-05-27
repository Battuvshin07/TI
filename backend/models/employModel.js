import mongoose from "mongoose";

const employSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    position: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role_name: { type: String, required: true },
    remember: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Employ = mongoose.model("employ-registration", employSchema);

export default Employ;
