import React from 'react';
import consts from '../../lib/data';

interface Props {
  name: string;
  exsisting: boolean;
}

const ProjectTile = ({ name, exsisting }: Props) => {
  return (
    <div className="project-tile"
      data-exsisting={exsisting}
      style={{
        backgroundImage: exsisting ? `url(${consts["TEMP_IMG"]})` : undefined,
      }}
    >
      <p>{name}</p>
    </div>
  );
};

export default ProjectTile;
