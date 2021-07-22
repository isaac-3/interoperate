import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

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
    projectID: {
      type: ObjectId,
      required: true,
      ref: "projects",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("pannels", pannelSchema);
