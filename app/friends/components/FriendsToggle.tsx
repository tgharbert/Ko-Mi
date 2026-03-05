"use client";
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
        <button
          onClick={onSwitch}
          className={`relative inline-flex h-6 w-11 items-center rounded-full mx-2 transition-colors ${isFriendsList ? "bg-gray-300" : "bg-secondary"}`}
          role="switch"
          aria-checked={!isFriendsList}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFriendsList ? "translate-x-1" : "translate-x-6"}`}
          />
        </button>
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
