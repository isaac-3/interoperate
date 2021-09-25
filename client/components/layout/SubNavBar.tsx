import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_PROJECT } from "../../lib/GraphQL/Queries";

interface Props {
  projectID?: string;
}

interface Project {
  id: string;
  title: string;
  ownerID: string;
  owner: object;
}

interface ProjectData {
  getProject: Project;
}

const SubNavBar = ({ projectID }: Props) => {
  // @ts-ignore
  const [projectData, setProjectData] = useState<Project>({});

  const { loading, data: { getProject } = {} } = useQuery<ProjectData>(
    GET_PROJECT,
    { variables: { projectID: projectID } }
  );

  useEffect(() => {
    if (getProject) {
      setProjectData(getProject);
    }
  }, [getProject]);

  return <div className="sub-nav-bar"></div>;
};

export default SubNavBar;
