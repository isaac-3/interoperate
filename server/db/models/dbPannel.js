import mongoose from "mongoose";
import Projects from "./dbProject.js";
import Items from "./dbItem.js";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const pannelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    list: [{ type: ObjectId, ref: "items" }],
    position: {
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

pannelSchema.post("findOneAndDelete", async (removedPannel, next) => {
  try {
    // Remove pannel items
    removedPannel.list.forEach(async (item) => {
      await Items.findByIdAndDelete(item);
    });
    // Remove pannel from project
    await Projects.findByIdAndUpdate(removedPannel.projectID, {
      $pull: { pannels: removedPannel._id },
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("pannels", pannelSchema);
