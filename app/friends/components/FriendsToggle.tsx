"use client";
import Switch from "@mui/material/Switch";
import { useState, useEffect, useCallback } from "react";
import Requests from "./Requests";
import FriendsList from "./FriendsList";
import getFriends from "@/app/friends/data/getFriends";
import addFriend from "@/app/friends/data/addFriend";

const FriendsToggle = ({ getAllRequests }: { getAllRequests: Function }) => {
  const [isFriendsList, setIsFriendsList] = useState(true);
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // state is unused but can be used to set error message...
  const [isErrGettingFriends, setIsErrGettingFriends] = useState(false);

  const getUserFriends = async () => {
    let result = await getFriends();
    if (result) {
      setFriends(result);
    } else {
      setIsErrGettingFriends(true);
      // error message thrown...
      // isErrGettingFriends error is the trigger
    }
    setIsLoading(false);
  };

  const getRequestsData = useCallback(async () => {
    let usersData: Friend[] = await getAllRequests();
    setRequests(usersData);
  }, [getAllRequests]);

  useEffect(() => {
    getUserFriends();
    getRequestsData();
  }, [getRequestsData]);

  const onSwitch = () => {
    setIsFriendsList(!isFriendsList);
  };

  const loadFriends = async (userId: string) => {
    setIsLoading(true);
    const friends = await addFriend(userId);
    setRequests(friends);
    await getUserFriends();
    setIsLoading(false);
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
          <FriendsList friends={friends} isLoading={isLoading} />
        </div>
      ) : (
        <Requests
          getAllRequests={getAllRequests}
          requests={requests}
          loadFriends={loadFriends}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default FriendsToggle;
