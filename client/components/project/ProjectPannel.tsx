import React from 'react';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import ListCard from './ListCard';

interface Props {
  name: string;
}

const ProjectPannel = ({ name }: Props) => {
  const dummyData = ["List-Item1", "List-Item2", "List-Item3", "List-Item4"];

  return (
    <div className="project-pannel">
      <div className="project-pannel-title">
        <p>{name}</p>
        <MoreHorizRoundedIcon
          onClick={() => console.log(name)}
          className="initial-icon"
        />
      </div>
      {dummyData.map((d) => (
        <ListCard key={d} content={d}/>
      ))}
    </div>
  );
};

export default ProjectPannel;
