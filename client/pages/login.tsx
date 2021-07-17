import React from 'react';
import { useSelector } from 'react-redux';
import LoginTemplate from '../components/landing-page/LoginTemplate';
import { RootState } from '../lib/rootReducer';

const Login = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="credentials-page">
      {user.id === 0 && <LoginTemplate defocus={false} />}
    </div>
  );
};

export default Login;
