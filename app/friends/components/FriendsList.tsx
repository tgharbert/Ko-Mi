import { useEffect, useState } from "react";
import getFriends from "@/lib/getFriends";
import FriendCard from "./FriendCard";
import LoadingPage from "@/app/loading";

const FriendsList = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserFriends = async () => {
    let result = await getFriends();
    setFriends(result);
  };

  useEffect(() => {
    getUserFriends();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div>Your Friends:</div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {friends.map((friend) => {
            return <FriendCard friend={friend} key={friend.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
