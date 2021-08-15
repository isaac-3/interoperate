import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
      required: true,
    },
    pannelID: {
      type: ObjectId,
      required: true,
      ref: "pannels",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("items", itemSchema);
