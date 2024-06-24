import FriendCard from "./FriendCard";
import LoadingPage from "@/app/loading";

const FriendsList = ({
  friends,
  isLoading,
}: {
  friends: User[];
  isLoading: boolean;
}) => {
  return (
    <div className="justify-center text-center">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col items-center ">
          {friends.map((friend) => {
            return <FriendCard friend={friend} key={friend.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
