import React from 'react';
import SignupTemplate from '../components/landing-page/SignupTemplate';

const Login = () => {
  return (
    <div className="credentials-page">
      <SignupTemplate defocus={false} />
    </div>
  );
};

export default Login;
