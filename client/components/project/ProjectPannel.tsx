import React, { useEffect, useRef, useState } from 'react';
import ListCard from './ListCard';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DefocusWrapper from '../util/DefocusWrapper';
import consts from '../../lib/data';

const dummyData = [
  "List-Item1",
  "List-Item2",
  "List-Item3",
  "List-Item4",
  "List-Item5",
  "List-Item6",
  "List-Item7",
  "List-Item8",
  "List-Item9",
  "List-Item10",
];

interface Props {
  name: string;
}

const ProjectPannel = ({ name }: Props) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [pannelTitle, setPannelTitle] = useState(name);
  const [displayNewCard, setDisplayNewCard] = useState(false);
  const [pannelItems, setPannelItems] = useState(dummyData);
  const [newCardData, setNewCardData] = useState("");
  const initialTitle = useRef<string>(name);
  const titleInputRed = useRef<HTMLInputElement>(null);
  const newCardRef = useRef<HTMLTextAreaElement>(null);
  const pannelContainerRef = useRef<HTMLDivElement>(null);

  const handleOption = (option: string) => {
    switch (option) {
      case "Add Card": {
        setDisplayNewCard(!displayNewCard);
        setDisplayMenu(false);
        break;
      }
      case "Rename Column": {
        titleInputRed.current?.focus();
        setDisplayMenu(false);
        break;
      }
      case "Delete Column": {
        console.log(option);
        break;
      }
    }
  };

  const handleSave = (item: string) => {
    switch (item) {
      case "new-pannel-name":
        titleInputRed.current?.blur();
        if (pannelTitle.trim().length === 0) {
          setPannelTitle(initialTitle.current);
        } else if (pannelTitle !== initialTitle.current) {
          initialTitle.current = pannelTitle;
        }
        break;
      case "new-card":
        newCardRef.current?.blur();
        if (newCardData.trim().length === 0) {
          console.log("no nmae insteted");
          setDisplayNewCard(false);
        } else {
          console.log("good");
          setDisplayNewCard(false);
          setPannelItems([...pannelItems, newCardData]);
          setNewCardData("");
        }
        break;
    }
    // TODO: Save new name
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
        <input
          data-valid={pannelTitle.length !== 0}
          ref={titleInputRed}
          value={pannelTitle}
          onChange={(e) => setPannelTitle(e.target.value)}
          onBlur={() => handleSave("new-pannel-name")}
          onKeyDown={(e) => {
            const key = e.keyCode || e.charCode;
            if (key === 13 && e.shiftKey === false) {
              handleSave("new-pannel-name");
            }
          }}
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
        {pannelItems.map((d) => (
          <ListCard key={d} content={d} />
        ))}
        {displayNewCard && (
          <textarea
            ref={newCardRef}
            className="project-new-card"
            value={newCardData}
            onChange={(e) => setNewCardData(e.target.value)}
            onBlur={() => handleSave("new-card")}
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
          onClick={() => console.log("Delete Column")}
        />
      </div>
    </div>
  );
};

export default ProjectPannel;
