import { useRouter } from 'next/router';
import React from 'react';
import ProjectPannel from '../../components/project/ProjectPannel';

interface Props {}

const Project = (props: Props) => {
  const router = useRouter();
  const projectID = router.query;
  console.log(projectID);

  const dummyData = ["Pannel1", "Pannel2", "Pannel3", "Pannel4"];

  return (
    <div className="project-page">
      {dummyData.map((d) => (
        <ProjectPannel key={d} name={d} />
      ))}
    </div>
  );
};

export default Project;
