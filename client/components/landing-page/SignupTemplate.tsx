import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../lib/hooks';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import FormInput from '../util/FormInput';

interface Props {
  defocus: boolean;
}

const SignupTemplate = ({ defocus } : Props) => {
  const dispatch = useDispatch();

  const [usernameValue, usernameError, usernameChange, usernameUpdate] =
    useForm("username");
  const [emailValue, emailError, emailChange, emailUpdate] =
    useForm("email");
  const [passwordValue, passwordError, passwordChange, passwordUpdate] =
    useForm("password");

  const handleSubmit = () => {
    // Runs every validaton function:
    // [usernameUpdate, passwordUpdate].forEach((f) => f());
    const res = passValidations();
    if (res) console.log("Ready to submit!");
  };

  const passValidations = () => {
    return [usernameUpdate, emailUpdate, passwordUpdate].every((x) => {
      return x().valueOf();
    });
  };

  return (
    <DefocusWrapper
      defocus={defocus}
      className="credentials-card"
      callBack={() => {
        dispatch(setModalDisplay());
        dispatch(setModalType(""));
      }}
    >
      <h3>Signup here</h3>
      <FormInput
        className="input-validation"
        type="text"
        placeholder="username"
        value={usernameValue}
        error={usernameError}
        handleChange={usernameChange}
        handleUpdate={usernameUpdate}
      />
      <FormInput
        className="input-validation"
        type="text"
        placeholder="email"
        value={emailValue}
        error={emailError}
        handleChange={emailChange}
        handleUpdate={emailUpdate}
      />
      <FormInput
        className="input-validation"
        type="password"
        placeholder="password"
        value={passwordValue}
        error={passwordError}
        handleChange={passwordChange}
        handleUpdate={passwordUpdate}
      />
      <div className="credentials-card-button" onClick={() => handleSubmit()}>
        Submit
      </div>
    </DefocusWrapper>
  );
};

export default SignupTemplate;
