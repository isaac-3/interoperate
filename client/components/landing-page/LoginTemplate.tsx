import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../lib/hooks';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import FormInput from '../util/FormInput';

const LoginTemplate = () => {
  const dispatch = useDispatch();

  const [usernameValue, usernameError, usernameChange, usernameUpdate] =
    useForm("username");
  const [passwordValue, passwordError, passwordChange, passwordUpdate] =
    useForm("password");

  return (
    <DefocusWrapper
      className="login-template"
      callBack={() => {
        dispatch(setModalDisplay());
        dispatch(setModalType(""));
      }}
    >
      <h3>Login here</h3>
      <FormInput
        type="text"
        placeholder="username"
        value={usernameValue}
        error={usernameError}
        handleChange={usernameChange}
        handleUpdate={usernameUpdate}
      />
      <FormInput
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

export default LoginTemplate;
