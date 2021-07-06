import React from 'react';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

interface Props {
  name: string;
}

const ProjectPannel = ({ name }: Props) => {
  return (
    <div className="project-pannel">
      <div className="project-pannel-title">
        <p>{name}</p>
        <MoreHorizRoundedIcon
          onClick={() => console.log(name)}
          className="initial-icon"
        />
      </div>
    </div>
  );
};

export default ProjectPannel;
