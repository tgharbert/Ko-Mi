"use client";
import UserList from "./UserList";
import Search from "./Search";

const Requests = ({
  requests,
  loadFriends,
  isLoading,
}: {
  getAllRequests: Function;
  requests: Friend[];
  loadFriends: Function;
  isLoading: boolean;
}) => {
  return (
    <div>
      <div>
        <div className="pt-4">
          <Search loadFriends={loadFriends} />
        </div>
        <div>
          <UserList
            requests={requests}
            loadFriends={loadFriends}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Requests;
