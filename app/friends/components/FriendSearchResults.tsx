import FriendSearchResult from "./FriendSearchResult";

const FriendSearchResults = ({
  searchResults,
  loadFriends,
}: {
  searchResults: UserData[];
  loadFriends: Function;
}) => {
  return (
    <div>
      {searchResults.map((user) => {
        return (
          <FriendSearchResult
            user={user}
            key={user.id}
            loadFriends={loadFriends}
          />
        );
      })}
    </div>
  );
};

export default FriendSearchResults;
