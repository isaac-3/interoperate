import React from 'react';
import { useForm } from '../../lib/hooks';
import FormInput from '../util/FormInput';

const LoginTemplate = () => {
  const [usernameValue, usernameError, usernameChange, usernameUpdate] =
    useForm("username");
  const [passwordValue, passwordError, passwordChange, passwordUpdate] =
    useForm("password");

  return (
    <div className="login-template">
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
    </div>
  );
};

export default LoginTemplate;
