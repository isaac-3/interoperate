import React, { useEffect, useRef, useState } from 'react';
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
  const titleInputRef = useRef<HTMLInputElement>(null);
  const initialTitle = useRef<string>("");

  // @ts-ignore
  const { itemID, pannelTitle } = useSelector((state: RootState) => state.modal.modalProps);

  const [item, setItem] = useState({} as Item);

  const { loading, data: { getItem } = {} } = useQuery<ItemData>(GET_ITEM, {
    variables: { itemID },
  });

  const handleUpdateItem = (field: string, newValue: any) => {
    setItem({ ...item, [field]: newValue });
  };

  const handleRename = () => {
    titleInputRef.current?.blur();
    if (item.title.trim().length === 0) {
      handleUpdateItem("title", initialTitle.current);
    } else if (item.title !== initialTitle.current) {
      initialTitle.current = item.title;
      // TODO: Rename/Update title
      console.log("Ready to update!");
    }
  };

  useEffect(() => {
    if (getItem) {
      setItem(getItem);
      initialTitle.current = getItem.title;
    }
  }, [getItem]);

  if (loading) return null;

  return (
    <DefocusWrapper
      className="modal-card-details"
      callBack={() => {
        dispatch(setModalDisplay());
        dispatch(setModalType(""));
      }}
    >
      <div className="modal-card-details-section">
        <h4>Item Title</h4>
        <input
          data-valid={item.title?.length !== 0}
          ref={titleInputRef}
          value={item.title}
          onChange={(e) => handleUpdateItem("title", e.target.value)}
          onBlur={() => handleRename()}
          onKeyDown={(e) => {
            const key = e.keyCode || e.charCode;
            if (key === 13 && e.shiftKey === false) {
              handleRename();
            }
          }}
        />
      </div>
      <div className="modal-card-details-section">
        <h4>Pannel Info</h4>
        <span>{pannelTitle}</span>
      </div>
      <div className="modal-card-details-section">
        <h4>Description</h4>
        <span>{item.description}</span>
      </div>
    </DefocusWrapper>
  );
};

export default CardDetailsModal;
