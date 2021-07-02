import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import NavBar from '../layout/NavBar';
import HomeCard from './HomeCard';

const LandingPage = () => {
  const [promptType, setPromptType] = useState("");
  const user = useSelector((state: RootState) => state["user"])
  console.log(user)

  return (
    <div className="landing-page">
      <NavBar setPromptType={(type) => setPromptType(type)} />
      <HomeCard promptType={promptType} />
    </div>
  );
};

export default LandingPage;
