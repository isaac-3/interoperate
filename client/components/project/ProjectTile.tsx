import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import consts from '../../lib/data';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';

interface Props {
  id?: string;
  name: string;
  exsisting: boolean;
}

const ProjectTile = ({ id, name, exsisting }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleTileClick = () => {
    if (exsisting) {
      router.push(`/p/${id}`);
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
      onClick={() => handleTileClick()}
    >
      <p>{name}</p>
    </div>
  );
};

export default ProjectTile;
