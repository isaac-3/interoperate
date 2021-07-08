import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setModalType,
  setModalDisplay,
  setModalProps,
} from '../../lib/slices/modalSlice';

interface Props {
  content: string;
}

const ListCard = ({ content }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="project-pannel-card"
      onClick={() => {
        dispatch(setModalProps(content));
        dispatch(setModalType("new-list-card"));
        dispatch(setModalDisplay());
      }}
    >
      <p>{content}</p>
    </div>
  );
};

export default ListCard;
