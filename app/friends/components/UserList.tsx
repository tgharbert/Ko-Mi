"use client";
import { useEffect, useState } from "react";
import UserCard from "./User";

const UserList = ({ getAllRequests }: { getAllRequests: Function }) => {
  const [requests, setRequests] = useState<Friend[]>([]);

  useEffect(() => {
    const getRequestsData = async () => {
      let usersData: Friend[] = await getAllRequests();
      setRequests(usersData);
    };
    getRequestsData();
  }, [getAllRequests]);

  return (
    <div>
      <div className="text-xl">Friend Requests:</div>
      {requests.map((request) => {
        return <UserCard user={request} key={request.id} />;
      })}
    </div>
  );
};

export default UserList;
