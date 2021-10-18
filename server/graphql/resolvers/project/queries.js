import Projects from "../../../models/dbProject.js";

const projectQueries = {
  getProject: async (_, { projectID }) => {
    const project = await Projects.findById(projectID)
      .populate("owner", "id username email")
      .populate("members", "id  username");
    return project;
  },
  getProjects: async (_, args, { req }) => {
    const myProjects = await Projects.find({ ownerID: req.id });
    return myProjects;
  },
};

export default projectQueries;
