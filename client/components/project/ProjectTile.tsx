import React from 'react';
import { useDispatch } from 'react-redux';
import consts from '../../lib/data';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';

interface Props {
  name: string;
  exsisting: boolean;
}

const ProjectTile = ({ name, exsisting }: Props) => {
  const dispatch = useDispatch();

  const handleBoardClick = () => {
    if (exsisting) {
      console.log("Redirect to project page");
    } else {
      dispatch(setModalType("new-project"));
      dispatch(setModalDisplay());
    }
  };

  return (
    <div className="project-tile"
      data-exsisting={exsisting}
      style={{
        backgroundImage: exsisting ? `url(${consts["TEMP_IMG"]})` : undefined,
      }}
      onClick={() => handleBoardClick()}
    >
      <p>{name}</p>
    </div>
  );
};

export default ProjectTile;
