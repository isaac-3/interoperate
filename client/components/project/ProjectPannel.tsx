import React, { useEffect, useRef, useState } from 'react';
import ListCard from './ListCard';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DefocusWrapper from '../util/DefocusWrapper';
import consts from '../../lib/data';
import {
  ADD_ITEM,
  DELETE_PANNEL,
  RENAME_PANNEL,
} from '../../lib/GraphQL/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PANNEL_ITEMS } from '../../lib/GraphQL/Queries';
import InputEditable from '../util/InputEditable';

interface Props {
  id: string;
  name: string;
}

interface Item {
  id: string;
  title: string;
  position: number;
  pannelID: string;
}

interface PannelItemsData {
  getPannelItems: Item[];
}

const ProjectPannel = ({ id, name }: Props) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [pannelTitle, setPannelTitle] = useState(name);
  const [displayNewCard, setDisplayNewCard] = useState(false);
  const [newCardData, setNewCardData] = useState("");
  const [focusTitle, setFocusTitle] = useState(false);
  const initialTitle = useRef<string>(name);
  const newCardRef = useRef<HTMLTextAreaElement>(null);
  const pannelContainerRef = useRef<HTMLDivElement>(null);

  const { data: { getPannelItems } = {} } = useQuery<PannelItemsData>(
    GET_PANNEL_ITEMS,
    { variables: { pannelID: id } }
  );

  const [deleteProject] = useMutation(DELETE_PANNEL, {
    update(cache) {
      const identifiedID = cache.identify({ id, __typename: "Pannel" });
      cache.evict({ id: identifiedID });
      cache.gc();
    },
  });

  const [renamePannel] = useMutation(RENAME_PANNEL);

  const [createItem] = useMutation(ADD_ITEM, {
    update(cache, { data: { addItem } }) {
      const data = cache.readQuery({
        query: GET_PANNEL_ITEMS,
        variables: { pannelID: id },
      });
      cache.writeQuery({
        query: GET_PANNEL_ITEMS,
        variables: { pannelID: id },
        data: {
          // @ts-ignore
          getPannelItems: [...data.getPannelItems, addItem],
        },
      });
    },
  });

  useEffect(() => {
    if (pannelTitle !== name) {
      setPannelTitle(name);
    }
  }, [name]);

  const handleOption = (option: string) => {
    switch (option) {
      case "Add Card": {
        setDisplayNewCard(!displayNewCard);
        setDisplayMenu(false);
        break;
      }
      case "Rename Column": {
        setFocusTitle(true);
        setDisplayMenu(false);
        break;
      }
      case "Delete Column": {
        deleteProject({ variables: { pannelID: id } });
        break;
      }
    }
  };

  const handleSave = (item: string) => {
    switch (item) {
      case "new-pannel-name":
        if (pannelTitle.trim().length === 0) {
          setPannelTitle(initialTitle.current);
        } else if (pannelTitle !== initialTitle.current) {
          initialTitle.current = pannelTitle;
          renamePannel({
            variables: {
              pannelID: id,
              update: { title: pannelTitle },
            },
          });
        }
        break;
      case "new-card":
        newCardRef.current?.blur();
        if (newCardData.trim().length === 0) {
          setDisplayNewCard(false);
        } else {
          createItem({
            variables: {
              title: newCardData,
              // @ts-ignore
              position: getPannelItems.length + 1,
              pannelID: id,
            },
          });
          handleBlur();
        }
        break;
    }
  };

  const handleBlur = () => {
    setDisplayNewCard(false);
    setNewCardData("");
  };

  useEffect(() => {
    if (displayNewCard) {
      if (pannelContainerRef.current) {
        pannelContainerRef.current.scrollTop =
          pannelContainerRef.current.scrollHeight;
        newCardRef.current?.focus();
      }
    }
  }, [displayNewCard]);

  return (
    <div className="project-pannel">
      <div className="project-pannel-title">
        <InputEditable
          value={pannelTitle}
          handleChange={(value) => setPannelTitle(value)}
          handleUpdate={() => {
            setFocusTitle(false);
            handleSave("new-pannel-name");
          }}
          outline={false}
          focusInput={focusTitle}
        />
        <MoreHorizRoundedIcon
          className="initial-icon"
          onClick={() => setDisplayMenu(!displayMenu)}
        />
        {displayMenu && (
          <DefocusWrapper
            className="pannel-menu"
            callBack={() => setDisplayMenu(false)}
          >
            {consts.PANNEL_OPTIONS.map((option, i) => (
              <p key={i} onClick={() => handleOption(option)}>
                {option}
              </p>
            ))}
          </DefocusWrapper>
        )}
      </div>
      <div className="project-pannel-card-container" ref={pannelContainerRef}>
        {getPannelItems?.map((d) => (
          <ListCard key={d.id} id={d.id} title={d.title} pannelTitle={name} />
        ))}
        {displayNewCard && (
          <textarea
            ref={newCardRef}
            className="project-new-card"
            value={newCardData}
            onBlur={() => handleBlur()}
            onChange={(e) => setNewCardData(e.target.value)}
            onKeyDown={(e) => {
              const key = e.keyCode || e.charCode;
              if (key === 13 && e.shiftKey === false) {
                handleSave("new-card");
              }
            }}
          />
        )}
      </div>
      <div className="project-pannel-footer">
        <p onClick={() => setDisplayNewCard(!displayNewCard)}>
          <AddIcon />
          Add New Card
        </p>
        <DeleteIcon
          fontSize="small"
          className="initial-icon"
          onClick={() => handleOption("Delete Column")}
        />
      </div>
    </div>
  );
};

export default ProjectPannel;
