import { useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState, useEffect } from 'react';
import ProjectPannel from '../../components/project/ProjectPannel';
import { GET_PROJECT_PANNELS } from '../../lib/GraphQL/Queries';
import { NextPage } from 'next';
import AddIcon from '@material-ui/icons/Add';
import { ADD_PANNEL } from '../../lib/GraphQL/Mutations';

interface Pannel {
  id: string;
  title: string;
  projectID: string;
}

interface PannelData {
  getProjectPannels: Pannel[];
}

interface PageProps {
  projectID?: string;
}

const Project: NextPage<PageProps> = ({ projectID }) => {
  const [displayInput, setDisplayInput] = useState(false);
  const [newPannelData, setNewPannelData] = useState("");
  const newPannelRef = useRef<HTMLInputElement>(null);

  const { loading, data: { getProjectPannels } = {} } = useQuery<PannelData>(
    GET_PROJECT_PANNELS,
    { variables: { projectID: projectID } }
  );

  const [createPannel] = useMutation(ADD_PANNEL, {
    update(cache, { data: { addPannel } }) {
      const data = cache.readQuery({
        query: GET_PROJECT_PANNELS,
        variables: { projectID: projectID },
      });
      cache.writeQuery({
        query: GET_PROJECT_PANNELS,
        variables: { projectID: projectID },
        data: {
          // @ts-ignore
          getProjectPannels: [...data.getProjectPannels, addPannel],
        },
      });
    },
  });

  const handleSave = async () => {
    await createPannel({
      variables: {
        title: newPannelData,
        // @ts-ignore
        position: getProjectPannels.length + 1,
        projectID: projectID,
      },
    });
    handleBlur();
  };

  const handleBlur = () => {
    setDisplayInput(false);
    setNewPannelData("");
  };

  useEffect(() => {
    if (displayInput) {
      newPannelRef.current?.focus();
    }
  }, [displayInput]);

  if (loading) return null;

  return (
    <div className="project-page">
      {getProjectPannels?.map((pannel) => (
        <ProjectPannel key={pannel.id} id={pannel.id} name={pannel.title} />
      ))}
      <div className="new-pannel-card">
        {displayInput ? (
          <input
            type="text"
            className="new-pannel-card-input"
            placeholder="Enter a new title"
            ref={newPannelRef}
            value={newPannelData}
            onBlur={() => handleBlur()}
            onChange={(e) => setNewPannelData(e.target.value)}
            onKeyDown={(e) => {
              const key = e.keyCode || e.charCode;
              if (key === 13 && e.shiftKey === false) {
                handleSave();
              }
            }}
          />
        ) : (
          <div onClick={() => setDisplayInput(!displayInput)}>
            <AddIcon />
            Add another pannel
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;

Project.getInitialProps = async ({ query }) => {
  return query;
};
