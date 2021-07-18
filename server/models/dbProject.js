import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pannels: {
      type: Array,
      default: [],
      required: true,
    },
    ownerID:{
      type: ObjectId,
      required: true,
      ref: "users",
    },
    members: {
      type: Array,
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("projects", projectSchema);
