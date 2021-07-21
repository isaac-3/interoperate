import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PROJECT } from '../../lib/GraphQL/Mutations';
import { useForm } from '../../lib/hooks';
import { RootState } from '../../lib/rootReducer';
import {
  resetModal,
  setModalDisplay,
  setModalType,
} from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import FormInput from '../util/FormInput';

const NewProjectModal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [createProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      cache.modify({
        fields: {
          getProjects(exsistingProjects = []) {
            const newProjectsRef = cache.writeFragment({
              data: addProject,
              fragment: gql`
                fragment NewProject on Project {
                  id
                  title
                  ownerID
                }
              `,
            });
            return [...exsistingProjects, newProjectsRef];
          },
        },
      });
    },
  });

  const [
    projectNameValue,
    projectNameError,
    projectNameChange,
    projectNameUpdate,
  ] = useForm("new-project");

  const handleSubmit = () => {
    // Runs every validaton function:
    // [usernameUpdate, passwordUpdate].forEach((f) => f());
    const res = passValidations();
    if (res) {
      createProject({
        variables: {
          title: projectNameValue,
          ownerID: user["id"],
        },
      });
      dispatch(resetModal());
    }
  };

  const passValidations = () => {
    return [projectNameUpdate].every((x) => {
      return x().valueOf();
    });
  };

  return (
    <DefocusWrapper
      className="modal-new-project"
      callBack={() => {
        dispatch(setModalDisplay());
        dispatch(setModalType(""));
      }}
    >
      <h3>Name Your Project</h3>
      <FormInput
        className="input-validation"
        type="text"
        placeholder="New Board Name"
        value={projectNameValue}
        error={projectNameError}
        handleChange={projectNameChange}
        handleUpdate={projectNameUpdate}
      />
      <div className="credentials-card-button" onClick={() => handleSubmit()}>
        Submit
      </div>
    </DefocusWrapper>
  );
};

export default NewProjectModal;
