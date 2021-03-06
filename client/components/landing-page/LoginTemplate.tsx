import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../lib/hooks';
import {
  resetModal,
  setModalDisplay,
  setModalType,
} from '../../lib/slices/modalSlice';
import DefocusWrapper from '../util/DefocusWrapper';
import FormInput from '../util/FormInput';
import { useMutation } from '@apollo/client';
import { LOG_IN } from '../../lib/GraphQL/Mutations';
import { useRouter } from 'next/router';
import { updateUser } from '../../lib/slices/userSlice';

interface Props {
  defocus: boolean;
}

const LoginTemplate = ({ defocus }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // @ts-ignore
  const [signUpUser, { data: { login } = {} }] = useMutation(LOG_IN);

  useEffect(() => {
    if (login) {
      if (login["id"]) {
        dispatch(resetModal());
        dispatch(updateUser(login));
        router.push(`/${login["username"]}`);
      }
      if (login["message"]) {
        console.log(login);
        return;
      }
    }
  }, [login]);

  const [usernameValue, usernameError, usernameChange, usernameUpdate] =
    useForm("username");
  const [passwordValue, passwordError, passwordChange, passwordUpdate] =
    useForm("password");

  const handleSubmit = () => {
    // Runs every validaton function:
    // [usernameUpdate, passwordUpdate].forEach((f) => f());
    const res = passValidations();
    if (res) {
      signUpUser({
        variables: {
          username: usernameValue,
          password: passwordValue,
        },
      });
    }
  };

  const passValidations = () => {
    return [usernameUpdate, passwordUpdate].every((x) => {
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
      <h3>Login here</h3>
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

export default LoginTemplate;
