import React, { useState } from "react";

interface Props {
  setPromptType: (type: string) => void;
}

const NavBar = ({ setPromptType }: Props) => {
  const [authed, setAuthed] = useState(false);

  return (
    <div className="nav-bar">
      {authed ? (
        <div>Not Authed User</div>
      ) : (
        <div>
          <div className="login" onClick={() => setPromptType("login")}>
            Login
          </div>
          <div className="signup" onClick={() => setPromptType("signup")}>
            Sign Up
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
