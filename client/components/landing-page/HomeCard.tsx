import React from 'react';
import LoginTemplate from './LoginTemplate';
import SignupTemplate from './SignupTemplate';

interface Props {
  promptType: string;
}

const LoginCard = ({ promptType }: Props) => {
  if (promptType === "") return <></>;

  return (
    <div className="home-card">
      {promptType === "login" ? (
        <LoginTemplate />
      ) : promptType === "signup" ? (
        <SignupTemplate />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginCard;
