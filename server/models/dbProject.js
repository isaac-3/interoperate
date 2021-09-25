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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual("owner", {
  ref: "users",
  localField: "ownerID",
  foreignField: "_id",
  justOne: true,
});

projectSchema.post("save", async (newProject, next) => {
  try {
    const pannels = await Promise.all(
      initPannels.map(async (pannel, index) => {
        const newPannel = new Pannels({
          title: pannel,
          position: index,
          projectID: newProject._id,
        });
        await newPannel.save();
        return newPannel;
      })
    );
    const pannelIDS = pannels.map((p) => p._id);
    await mongoose.model("projects", projectSchema).findByIdAndUpdate(
      newProject._id,
      {
        $push: { pannels: { $each: pannelIDS } },
      },
      {
        new: true,
      }
    );
    newProject["pannels"] = pannels;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("projects", projectSchema);
