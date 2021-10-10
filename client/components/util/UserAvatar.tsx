import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import DefocusWrapper from "./DefocusWrapper";

interface Props {
  username: string;
  menuType: string;
  isUser: boolean;
}

const UserAvatar = ({ username, menuType, isUser }: Props) => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const submenuOptions = (menuType: string, isUser: boolean) => {
    switch (menuType) {
      case "projectPage":
        return isUser ? ["Edit Profile"] : ["Remove from project"];
      default:
        return [""];
    }
  };

  return (
    <div className="nav-bar-avatar-wrapper">
      <Avatar
        className="nav-bar-avatar"
        variant="circular"
        onClick={() => setDisplayMenu(!displayMenu)}
      >
        {username.substring(0, 2)}
      </Avatar>
      {displayMenu && (
        <DefocusWrapper
          className="nav-bar-avatar-submenu"
          callBack={() => setDisplayMenu(!displayMenu)}
        >
          {submenuOptions(menuType, isUser).map((option, i) => (
            <p key={i}>{option}</p>
          ))}
        </DefocusWrapper>
      )}
    </div>
  );
};

export default UserAvatar;
