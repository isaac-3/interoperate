import React from 'react';
import LoginCard from './LoginCard';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <>
        <div className="login">Login</div>
        <div className="signup">Sign Up</div>
      </>
      <LoginCard />
    </div>
  );
};

export default LandingPage;
