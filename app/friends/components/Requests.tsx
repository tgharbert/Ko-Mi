"use client";
import { useState, useEffect } from "react";
import UserList from "./UserList";
import Search from "./Search";
import LoadingPage from "@/app/loading";
import addFriend from "@/lib/addFriend";

const Requests = ({ getAllRequests }: { getAllRequests: Function }) => {
  const [requests, setRequests] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRequestsData = async () => {
    let usersData: Friend[] = await getAllRequests();
    setRequests(usersData);
    setIsLoading(false);
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  const loadFriends = async (userId: string, accepted: boolean) => {
    setIsLoading(true);
    const friends = await addFriend(userId);
    setRequests(friends);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="pt-4">
            <Search loadFriends={loadFriends} />
          </div>
          <div>
            <UserList requests={requests} loadFriends={loadFriends} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
