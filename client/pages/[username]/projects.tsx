import { useRouter } from 'next/router';
import React from 'react';
import ProjectTile from '../../components/project/ProjectTile';
import { GET_PROJECTS } from '../../lib/GraphQL/Queries';
import { useQuery } from '@apollo/client';

interface Project {
  id: string;
  title: string;
}

interface ProjectData {
  getProjects: Project[];
}

const Projects = () => {
  const router = useRouter();
  const username = router.query["username"];

  const { loading, data: { getProjects } = {} } =
    useQuery<ProjectData>(GET_PROJECTS);

  if (loading) {
    return null;
  }

  return (
    <div className="initial-page">
      <div className="project-page-container">
        <h3>My Projects</h3>
        <div className="project-holder">
          {getProjects?.map((project) => (
            <ProjectTile
              key={project["id"]}
              id={project["id"]}
              name={project["title"]}
              exsisting
            />
          ))}
          <ProjectTile name="Create New Board" exsisting={false} />
        </div>
        <h3>Guest Projects</h3>
        {/* TODO: Member projects */}
      </div>
    </div>
  );
};

export default Projects;
