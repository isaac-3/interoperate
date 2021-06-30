import React, { useState } from 'react';
import HomeCard from './HomeCard';

const LandingPage = () => {
  const [promptType, setPromptType] = useState("");

  return (
    <div className="landing-page">
      <>
        <div className="login" onClick={() => setPromptType("login")}>
          Login
        </div>
        <div className="signup" onClick={() => setPromptType("signup")}>
          Sign Up
        </div>
      </>
      <HomeCard promptType={promptType} />
    </div>
  );
};

export default LandingPage;
