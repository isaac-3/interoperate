import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import DefocusWrapper from "./DefocusWrapper";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
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
        data-isuser={isUser}
      >
        {username.substring(0, 2)}
        {isUser && (
          <StarRoundedIcon fontSize="small" className="nav-bar-avatar-isUser" />
        )}
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
