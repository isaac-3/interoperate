import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const [authed, setAuthed] = useState(false);

  const handlePromptType = (type: string) => {
    dispatch(setModalDisplay());
    dispatch(setModalType(type));
  };

  return (
    <div className="nav-bar">
      {authed ? (
        <div>Authed User</div>
      ) : (
        <>
          <div className="login" onClick={() => handlePromptType("login")}>
            Login
          </div>
          <div className="signup" onClick={() => handlePromptType("signup")}>
            Sign Up
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
