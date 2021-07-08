import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';

const CardDetailsModal = () => {
  const dispatch = useDispatch();
  const { modalProps } = useSelector((state: RootState) => state.modal);

  const [content, setContent] = useState(modalProps as string);

  useEffect(() => {
    // TODO: Fetch card details
    console.log(modalProps);
  }, []);

  return (
    <DefocusWrapper
      className="modal-card-details"
      callBack={() => {
        dispatch(setModalDisplay());
        dispatch(setModalType(""));
      }}
    >
      <h4>Card Info</h4>
      <p>{content}</p>
    </DefocusWrapper>
  );
};

export default CardDetailsModal;
