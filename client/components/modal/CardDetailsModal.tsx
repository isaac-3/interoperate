import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import { useQuery } from '@apollo/client';
import { GET_ITEM } from '../../lib/GraphQL/Queries';

interface Item {
  id: string;
  title: string;
  description: string;
  position: number;
  pannelID: string;
}

interface ItemData {
  getItem: Item;
}

const CardDetailsModal = () => {
  const dispatch = useDispatch();
  const { modalProps } = useSelector((state: RootState) => state.modal);

  const [content, setContent] = useState(modalProps as string);

  const { data: { getItem } = {} } = useQuery<ItemData>(GET_ITEM, {
    variables: { itemID: modalProps },
  });

  console.log(getItem)

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
