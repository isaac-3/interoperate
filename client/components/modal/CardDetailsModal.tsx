import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import { useQuery } from '@apollo/client';
import { GET_ITEM } from '../../lib/GraphQL/Queries';
import InputEditable from '../util/InputEditable';

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

type StringProp<T> = {
  [P in keyof T]: T[P] extends string ? P : never;
}[keyof T];

const initialState = {
  id: "0",
  title: "0",
  description: "0",
  position: 0,
  pannelID: "0",
} as Item;

const CardDetailsModal = () => {
  const dispatch = useDispatch();
  const initialTitle = useRef<string>("");
  const initialDescription = useRef<string>("");

  // @ts-ignore
  const { itemID, pannelTitle } = useSelector((state: RootState) => state.modal.modalProps);

  const [item, setItem] = useState(initialState);

  const { loading, data: { getItem } = {} } = useQuery<ItemData>(GET_ITEM, {
    variables: { itemID },
  });

  const handleUpdateItem = (field: string, newValue: any) => {
    setItem({ ...item, [field]: newValue });
  };

  const handleRename = (
    property: StringProp<Item>,
    refObject: { current: string }
  ) => {
    if (item[property].trim().length === 0) {
      handleUpdateItem(property, refObject.current);
    } else if (item[property] !== refObject.current) {
      refObject.current = item[property];
      // TODO: Update property
      console.log("Ready to update!");
    }
  };

  useEffect(() => {
    if (getItem) {
      setItem(getItem);
      initialTitle.current = getItem.title;
      initialDescription.current = getItem.description;
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
        <InputEditable
          value={item.title}
          handleChange={(value) => handleUpdateItem("title", value)}
          handleUpdate={() => handleRename("title", initialTitle)}
        />
      </div>
      <div className="modal-card-details-section">
        <h4>Pannel Info</h4>
        <span>{pannelTitle}</span>
      </div>
      <div className="modal-card-details-section">
        <h4>Description</h4>
        <InputEditable
          value={item.description}
          handleChange={(value) => handleUpdateItem("description", value)}
          handleUpdate={() => handleRename("description", initialDescription)}
        />
      </div>
    </DefocusWrapper>
  );
};

export default CardDetailsModal;
