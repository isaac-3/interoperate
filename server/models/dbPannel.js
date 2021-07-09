import mongoose from "mongoose";

const { Schema } = mongoose;

const pannelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      default: [],
      required: true,
    },
    postition: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("pannels", pannelSchema);
