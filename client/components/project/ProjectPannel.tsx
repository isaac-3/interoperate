import React from 'react';
import ListCard from './ListCard';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  name: string;
}

const ProjectPannel = ({ name }: Props) => {

  const dummyData = [
    "List-Item1",
    "List-Item2",
    "List-Item3",
    "List-Item4",
    "List-Item5",
    "List-Item6",
    "List-Item7",
    "List-Item8",
    "List-Item9",
    "List-Item10",
  ];

  return (
    <div className="project-pannel">
      <div className="project-pannel-title">
        <p>{name}</p>
        <MoreHorizRoundedIcon
          onClick={() => console.log(name)}
          className="initial-icon"
        />
      </div>
      <div className="project-pannel-card-container">
        {dummyData.map((d) => (
          <ListCard key={d} content={d} />
        ))}
      </div>
      <div className="project-pannel-footer">
        <p>
          <AddIcon />
          Add New Card
        </p>
        <MoreHorizRoundedIcon
          onClick={() => console.log(name)}
          className="initial-icon"
        />
      </div>
    </div>
  );
};

export default ProjectPannel;
