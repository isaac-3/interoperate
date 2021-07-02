import React, { useState } from "react";
import NavBar from "../layout/NavBar";
import HomeCard from "./HomeCard";

const LandingPage = () => {
  const [promptType, setPromptType] = useState("");

  return (
    <div className="landing-page">
      <NavBar setPromptType={(type) => setPromptType(type)} />
      <HomeCard promptType={promptType} />
    </div>
  );
};

export default LandingPage;
