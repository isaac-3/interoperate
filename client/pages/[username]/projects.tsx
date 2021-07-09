import { useRouter } from 'next/router';
import React from 'react';
import ProjectTile from '../../components/project/ProjectTile';
import { GET_PROJECTS } from '../../lib/GraphQL/Queries';
import apolloClient from '../../apolloClient';

interface Project {
  id: string;
  title: string;
}

interface Props {
  projects: Project[];
}

const Projects = ({ projects }: Props) => {
  const router = useRouter();
  const username = router.query["username"];
  console.log(username);
  console.log(projects);

  return (
    <div className="initial-page">
      <div className="project-page-container">
        <h3>My Projects</h3>
        <div className="project-holder">
          {projects.map((d) => (
            <ProjectTile key={d["id"]} name={d["title"]} exsisting />
          ))}
          <ProjectTile name="Create New Board" exsisting={false} />
        </div>
        <h3>Guest Projects</h3>
        <div className="project-holder">
          {projects.map((d) => (
            <ProjectTile key={d["id"]} name={d["title"]} exsisting />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

export const getServerSideProps = async () => {
  const { data } = await apolloClient.query({
    query: GET_PROJECTS,
  });

  return {
    props: {
      projects: data["getProjects"],
    },
  };
};
