import React from 'react';
import { useSelector } from 'react-redux';
import SignupTemplate from '../components/landing-page/SignupTemplate';
import { RootState } from '../lib/rootReducer';

const Login = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="credentials-page">
      {user.id === 0 && <SignupTemplate defocus={false} />}
    </div>
  );
};

export default Login;
