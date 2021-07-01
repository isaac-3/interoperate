import React from 'react';
import { useForm } from '../../lib/hooks';
import FormInput from '../util/FormInput';

const SignupTemplate = () => {
  const [usernameValue, usernameError, usernameChange, usernameUpdate] =
    useForm("username");
  const [emailValue, emailError, emailChange, emailUpdate] =
    useForm("email");
  const [passwordValue, passwordError, passwordChange, passwordUpdate] =
    useForm("password");

  return (
    <div className="login-template">
      <h3>Signup here</h3>
      <FormInput
        type="text"
        placeholder="username"
        value={usernameValue}
        error={usernameError}
        handleChange={usernameChange}
        handleUpdate={usernameUpdate}
      />
      <FormInput
        type="text"
        placeholder="email"
        value={emailValue}
        error={emailError}
        handleChange={emailChange}
        handleUpdate={emailUpdate}
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
    </div>
  );
};

export default SignupTemplate;
