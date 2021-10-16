import Pannels from "../../../models/dbPannel";

const pannelQueries: object = {
  getPannels: async () => await Pannels.find({}).exec(),
  getProjectPannels: async (_, { projectID }) => {
    const projectPannels = await Pannels.find({ projectID: projectID }).sort({
      position: "asc",
    });
    return projectPannels;
  },
};

export default pannelQueries;
