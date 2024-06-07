"use client";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import Requests from "./Requests";
import FriendsList from "./FriendsList";

const FriendsToggle = ({ getAllRequests }: { getAllRequests: Function }) => {
  const [isFriendsList, setIsFriendsList] = useState(true);

  const onSwitch = () => {
    setIsFriendsList(!isFriendsList);
  };

  return (
    <div>
      <div>
        <Switch onChange={onSwitch} />
      </div>
      {isFriendsList ? (
        <FriendsList />
      ) : (
        <Requests getAllRequests={getAllRequests} />
      )}
    </div>
  );
};

export default FriendsToggle;
