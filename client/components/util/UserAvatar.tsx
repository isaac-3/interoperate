import Avatar from "@material-ui/core/Avatar";
import React from "react";

interface Props {
  username: string;
}

const UserAvatar = ({ username }: Props) => {
  return (
    <Avatar
      className="nav-bar-avatar"
      variant="circular"
      onClick={() => {
        console.log("good");
      }}
    >
      {username.substring(0, 2)}
    </Avatar>
  );
};

export default UserAvatar;
