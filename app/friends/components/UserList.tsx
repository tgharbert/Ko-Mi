"use client";
import UserCard from "./User";
import LoadingPage from "@/app/loading";

const UserList = ({
  requests,
  loadFriends,
  isLoading,
}: {
  requests: Friend[];
  loadFriends: Function;
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="text-xl pt-4">Friend Requests:</div>
      {requests.length === 0 && (
        <p className="pt-4 italic">You have no friend requests right now.</p>
      )}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {requests.map((request) => {
            return (
              <UserCard
                user={request}
                key={request.id}
                loadFriends={loadFriends}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserList;
