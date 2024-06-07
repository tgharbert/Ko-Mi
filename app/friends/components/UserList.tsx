"use client";
import UserCard from "./User";

const UserList = ({
  requests,
  loadFriends,
}: {
  requests: Friend[];
  loadFriends: Function;
}) => {
  return (
    <div>
      <div className="text-xl pt-4">Friend Requests:</div>
      {requests.map((request) => {
        return (
          <UserCard user={request} key={request.id} loadFriends={loadFriends} />
        );
      })}
    </div>
  );
};

export default UserList;
