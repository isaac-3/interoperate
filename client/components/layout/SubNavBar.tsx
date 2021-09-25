import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { GET_PROJECT } from "../../lib/GraphQL/Queries";
import InputEditable from "../util/InputEditable";
import NavBarSeparator from "../util/NavBarSeparator ";

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

type InputHandle = React.ElementRef<typeof InputEditable>;

const SubNavBar = ({ projectID }: Props) => {
  const [projectTitle, setProjectTitle] = useState("");
  // @ts-ignore
  // const [projectData, setProjectData] = useState<Project>({});
  const initialTitle = useRef<string>("");
  const titleInputRef = useRef<InputHandle>(null);

  const { loading, data: { getProject } = {} } = useQuery<ProjectData>(
    GET_PROJECT,
    { variables: { projectID: projectID } }
  );

  useEffect(() => {
    if (getProject) {
      // setProjectData(getProject);
      setProjectTitle(getProject["title"]);
      initialTitle.current = getProject["title"];
    }
  }, [getProject]);

  const handleSave = () => {
    if (projectTitle.trim().length === 0) {
      setProjectTitle(initialTitle.current);
    } else if (projectTitle !== initialTitle.current) {
      initialTitle.current = projectTitle;
      console.log("Ready to update!");
    }
  };

  return (
    <div className="sub-nav-bar">
      <InputEditable
        value={projectTitle}
        handleChange={(value) => setProjectTitle(value)}
        handleUpdate={() => handleSave()}
        outline={true}
        ref={titleInputRef}
        className="sub-nav-bar-input"
      />
      <NavBarSeparator />
    </div>
  );
};

export default SubNavBar;
