import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../lib/hooks';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import FormInput from '../util/FormInput';

const NewProjectModal = () => {
  const dispatch = useDispatch();

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
    if (res) console.log("Ready to submit!");
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
