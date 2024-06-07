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
        <div>
          <div className="text-xl pt-4 float-center">Your Friends:</div>

          <FriendsList />
        </div>
      ) : (
        <Requests getAllRequests={getAllRequests} />
      )}
    </div>
  );
};

export default FriendsToggle;
