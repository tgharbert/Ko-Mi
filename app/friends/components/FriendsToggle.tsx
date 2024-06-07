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
        <label>Friends</label>
        <Switch onChange={onSwitch} />
        <label>Requests</label>
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
