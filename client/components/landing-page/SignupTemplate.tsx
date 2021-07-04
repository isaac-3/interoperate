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

  return (
    <DefocusWrapper
      defocus={defocus}
      className="login-template"
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
      <div>Submit</div>
    </DefocusWrapper>
  );
};

export default SignupTemplate;
