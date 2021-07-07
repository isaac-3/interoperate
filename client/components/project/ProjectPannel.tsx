import React, { useRef, useState } from 'react';
import ListCard from './ListCard';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DefocusWrapper from '../util/DefocusWrapper';
import consts from '../../lib/data';

interface Props {
  name: string;
}

const ProjectPannel = ({ name }: Props) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [pannelTitle, setPannelTitle] = useState(name);
  const initialTitle = useRef<string>(name);
  const titleInput = useRef<HTMLInputElement>(null);

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

  const handleOption = (option: string) => {
    switch (option) {
      case "Add Card": {
        console.log(option);
        break;
      }
      case "Rename Column": {
        titleInput?.current?.focus();
        setDisplayMenu(false);
        break;
      }
      case "Delete Column": {
        console.log(option);
        break;
      }
    }
  };

  const handleSave = () => {
    titleInput?.current?.blur();
    if (pannelTitle.trim().length === 0) {
      setPannelTitle(initialTitle.current);
    } else if (pannelTitle !== initialTitle.current) {
      initialTitle.current = pannelTitle;
    }
    // TODO: Save new name
  };

  return (
    <div className="project-pannel">
      <div className="project-pannel-title">
        <input
          data-valid={pannelTitle.length !== 0}
          ref={titleInput}
          value={pannelTitle}
          onChange={(e) => setPannelTitle(e.target.value)}
          onBlur={() => handleSave()}
          onKeyDown={(e) => {
            const key = e.keyCode || e.charCode;
            if (key === 13 && e.shiftKey === false) {
              handleSave();
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
      <div className="project-pannel-card-container">
        {dummyData.map((d) => (
          <ListCard key={d} content={d} />
        ))}
      </div>
      <div className="project-pannel-footer">
        <p>
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
