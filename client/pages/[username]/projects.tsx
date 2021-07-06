import { useRouter } from 'next/router';
import React from 'react';
import ProjectTile from '../../components/project/ProjectTile';

const Projects = () => {
  const router = useRouter();
  const username = router.query["username"];

  const dummyData = [
    "Board1",
    "Board2",
    "Board3",
    "Board4",
    "Board5",
    "Board6",
  ];
  // TODO: Fetch boards

  return (
    <div className="initial-page">
      <div className="project-page-container">
        <h3>My Projects</h3>
        <div className="project-holder">
          {dummyData.map((d) => (
            <ProjectTile key={d} name={d} exsisting />
          ))}
          <ProjectTile name="Create New Board" exsisting={false} />
        </div>
        <h3>Guest Projects</h3>
        <div className="project-holder">
          {dummyData.map((d) => (
            <ProjectTile key={d} name={d} exsisting />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
