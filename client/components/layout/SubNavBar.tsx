import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { UPDATE_PROJECT } from "../../lib/GraphQL/Mutations";
import { GET_PROJECT } from "../../lib/GraphQL/Queries";
import { RootState } from "../../lib/rootReducer";
import InputEditable from "../util/InputEditable";
import NavBarSeparator from "../util/NavBarSeparator ";
import UserAvatar from "../util/UserAvatar";

interface Props {
  projectID: string;
}

interface Member {
  id: number;
  username: string;
}

interface Project {
  id: string;
  title: string;
  ownerID: string;
  owner: object;
  members: Member[];
}

interface ProjectData {
  getProject: Project;
}

type InputHandle = React.ElementRef<typeof InputEditable>;

const SubNavBar = ({ projectID }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [projectTitle, setProjectTitle] = useState("");
  const initialTitle = useRef<string>("");
  const titleInputRef = useRef<InputHandle>(null);

  const { loading, data: { getProject } = {} } = useQuery<ProjectData>(
    GET_PROJECT,
    { variables: { projectID: projectID } }
  );

  const [renamePannel] = useMutation(UPDATE_PROJECT);

  useEffect(() => {
    if (getProject) {
      setProjectTitle(getProject["title"]);
      initialTitle.current = getProject["title"];
    }
  }, [getProject]);

  const handleSave = () => {
    if (projectTitle.trim().length === 0) {
      setProjectTitle(initialTitle.current);
    } else if (projectTitle !== initialTitle.current) {
      initialTitle.current = projectTitle;
      renamePannel({
        variables: {
          projectID: projectID,
          update: { title: projectTitle },
        },
      });
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
      <div className="nav-bar-members-container">
        {getProject?.["members"].map((member, i) => (
          <UserAvatar
            key={i}
            username={member["username"]}
            menuType="projectPage"
            isUser={member["id"] === user["id"]}
          />
        ))}
      </div>
    </div>
  );
};

export default SubNavBar;
