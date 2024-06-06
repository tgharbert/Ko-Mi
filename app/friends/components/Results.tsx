import Result from "./Result";

const Results = ({ searchResults }: { searchResults: UserData[] }) => {
  return (
    <div>
      {searchResults.map((user) => {
        return <Result user={user} key={user.id} />;
      })}
    </div>
  );
};

export default Results;
