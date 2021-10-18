import Pannels from "../../../db/models/dbPannel.js";

const pannelQueries = {
  getPannels: async () => await Pannels.find({}).exec(),
  getProjectPannels: async (_, { projectID }) => {
    const projectPannels = await Pannels.find({ projectID: projectID }).sort({
      position: "asc",
    });
    return projectPannels;
  },
};

export default pannelQueries;
