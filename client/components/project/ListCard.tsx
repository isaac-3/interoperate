import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setModalType,
  setModalDisplay,
  setModalProps,
} from '../../lib/slices/modalSlice';

interface Props {
  id: string;
  title: string;
  pannelTitle: string;
}

const ListCard = ({ id, title, pannelTitle }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="project-pannel-card"
      onClick={() => {
        dispatch(setModalProps({ itemID: id, pannelTitle: pannelTitle }));
        dispatch(setModalType("new-list-card"));
        dispatch(setModalDisplay());
      }}
    >
      <p>{title}</p>
    </div>
  );
};

export default ListCard;
