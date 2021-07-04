import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';

const diabledNavbarPaths = ["login", "signup"];

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const urlPath = router.asPath.split("/")[1];

  const [authed, setAuthed] = useState(false);

  const handlePromptType = (type: string) => {
    dispatch(setModalDisplay());
    dispatch(setModalType(type));
  };

  if (diabledNavbarPaths.includes(urlPath)) return null;

  return (
    <>
      {authed ? (
        <div>Authed User</div>
      ) : (
        <div className="nav-bar-unauthed">
          <h3>Interoperate</h3>
          <div  className="nav-bar-button"
            onClick={() => handlePromptType("login")}
          >
            Login
          </div>
          <div className="nav-bar-button"
            onClick={() => handlePromptType("signup")}
          >
            Sign Up
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
