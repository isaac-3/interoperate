import Pannels from "../../../models/dbPannel.js";

const pannelMutations = {
  addPannel: async (_, args) => {
    const pannel = new Pannels(args);
    await pannel.save();
    return pannel;
  },
  deletePannel: async (_, { pannelID }) => {
    const myProjects = await Pannels.findByIdAndDelete(pannelID);
    if (myProjects) {
      return {
        success: true,
        message: "Successfully completed",
      };
    } else {
      return {
        success: false,
        message: "An error occured",
      };
    }
  },
  renamePannel: async (_, { pannelID, update }) => {
    const myProjects = await Pannels.findByIdAndUpdate(pannelID, update, {
      new: true,
    });
    if (myProjects) {
      return {
        success: true,
        message: "Successfully completed",
        pannel: myProjects,
      };
    } else {
      return {
        success: false,
        message: "An error occured",
        pannel: { id: 0, title: "" },
      };
    }
  },
};

export default pannelMutations;
