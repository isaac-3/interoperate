import React from 'react';
import LoginTemplate from '../components/landing-page/LoginTemplate';

const Login = () => {
  return (
    <div className="credentials-page">
      <LoginTemplate defocus={false} />
    </div>
  );
};

export default Login;
