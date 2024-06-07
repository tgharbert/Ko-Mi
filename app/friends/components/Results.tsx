import Result from "./Result";

const Results = ({
  searchResults,
  loadFriends,
}: {
  searchResults: UserData[];
  loadFriends: Function;
}) => {
  return (
    <div>
      {searchResults.map((user) => {
        return <Result user={user} key={user.id} loadFriends={loadFriends} />;
      })}
    </div>
  );
};

export default Results;
