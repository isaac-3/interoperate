import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import { resetModal } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ITEM } from '../../lib/GraphQL/Queries';
import InputEditable from '../util/InputEditable';
import { StringProp } from '../../lib/typeHelpers';
import { UPDATE_ITEM } from '../../lib/GraphQL/Mutations';

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

const initialState = {
  id: "",
  title: "",
  description: "",
  position: 0,
  pannelID: "",
} as Item;

const CardDetailsModal = () => {
  const dispatch = useDispatch();
  const initialTitle = useRef<string>("");
  const initialDescription = useRef<string>("");

  // @ts-ignore
  const { itemID, pannelTitle } = useSelector(
    (state: RootState) => state.modal.modalProps
  );

  const [item, setItem] = useState(initialState);

  const { loading, data: { getItem } = {} } = useQuery<ItemData>(GET_ITEM, {
    variables: { itemID },
    fetchPolicy: "no-cache",
  });

  const [updateItem] = useMutation(UPDATE_ITEM, {
    update(cache, { data: { updateItem } }) {
      cache.modify({
        fields: {
          getPannelItems(exsistingItems = []) {
            const itemIndex = exsistingItems.findIndex(
              (item: Item) => item.id === updateItem.id
            );
            const items = [...exsistingItems];
            items[itemIndex] = updateItem;
            return items;
          },
        },
      });
    },
  });

  const handleUpdateItem = (field: string, newValue: any) => {
    setItem({ ...item, [field]: newValue });
  };

  const returnUpdateProp = (property: string) => {
    switch (property) {
      case "title":
        return { title: item.title };
      case "description":
        return { description: item.description };
      default:
        return {};
    }
  };

  const handleRename = (
    property: StringProp<Item>,
    refObject: { current: string }
  ) => {
    if (item[property].trim().length === 0) {
      handleUpdateItem(property, refObject.current);
    } else if (item[property] !== refObject.current) {
      refObject.current = item[property];
      updateItem({
        variables: {
          itemID: itemID,
          update: returnUpdateProp(property),
        },
      });
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
      callBack={() => dispatch(resetModal())}
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
