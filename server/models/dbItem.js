import mongoose from "mongoose";
import Pannels from "./dbPannel.js";

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

itemSchema.post("save", async (newItem, next) => {
  try {
    await Pannels.findByIdAndUpdate(newItem.pannelID, {
      $push: { list: newItem._id },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("items", itemSchema);
