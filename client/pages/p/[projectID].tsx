import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const Project = (props: Props) => {
  const router = useRouter();
  const projectID = router.query;
  console.log(projectID);
  return <div>{projectID}</div>;
};

export default Project;
