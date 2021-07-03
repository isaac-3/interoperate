import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalDisplay, setModalType } from '../../lib/slices/modalSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const [authed, setAuthed] = useState(false);

  const handlePromptType = (type: string) => {
    dispatch(modalDisplay());
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
