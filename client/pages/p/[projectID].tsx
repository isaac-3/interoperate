import { useQuery } from '@apollo/client';
import React from 'react';
import ProjectPannel from '../../components/project/ProjectPannel';
import { GET_PROJECT_PANNELS } from '../../lib/GraphQL/Queries';
import { NextPage } from 'next';

interface Pannel {
  id: string;
  title: string;
}

interface PannelData {
  getProjectPannels: Pannel[];
}

interface PageProps {
  projectID?: string;
}

const Project: NextPage<PageProps> = ({ projectID }) => {

  const { loading, data: { getProjectPannels } = {} } = useQuery<PannelData>(
    GET_PROJECT_PANNELS,
    { variables: { projectID: projectID } }
  );

  return (
    <div className="project-page">
      {getProjectPannels?.map((pannel) => (
        <ProjectPannel key={pannel.id} name={pannel.title} />
      ))}
    </div>
  );
};

export default Project;

Project.getInitialProps = async ({ query }) => {
  return query;
};
