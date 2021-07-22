import mongoose from "mongoose";
import Pannels from "./dbPannel.js";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const initPannels = ["Todo", "In progress", "Completed"];

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pannels: [{ type: ObjectId, ref: "pannels" }],
    ownerID: {
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

projectSchema.post("save", async (newProject, next) => {
  try {
    const pannels = await Promise.all(
      initPannels.map(async (pannel, index) => {
        const newPannel = new Pannels({
          title: pannel,
          postition: index,
          projectID: newProject._id,
        });
        await newPannel.save();
        return newPannel;
      })
    );
    newProject["pannels"] = pannels;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("projects", projectSchema);
