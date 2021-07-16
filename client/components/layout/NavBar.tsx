import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/rootReducer';
import { setModalDisplay, setModalType } from '../../lib/slices/modalSlice';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const diabledNavbarPaths = ["login", "signup"];

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const urlPath = router.asPath.split("/")[1];

  const user = useSelector((state: RootState) => state.user.user);

  const handlePromptType = (type: string) => {
    dispatch(setModalDisplay());
    dispatch(setModalType(type));
  };

  if (diabledNavbarPaths.includes(urlPath)) return null;

  if (user.id === null) return null;

  return (
    <>
      {user.id ? (
        <div className="nav-bar-authed">
          <HomeIcon className="nav-bar-icon" />
          <h3>Interoperate</h3>
          <Avatar
            className="nav-bar-profile"
            variant="rounded"
            onClick={() => console.log("Profile")}
          >
            <AccountCircleIcon className="nav-bar-profile-icon" />
          </Avatar>
        </div>
      ) : (
        <div className="nav-bar-unauthed">
          <h3>Interoperate</h3>
          <div className="nav-bar-button"
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
