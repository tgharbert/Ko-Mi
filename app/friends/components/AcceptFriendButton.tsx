import acceptFriend from "@/lib/acceptFriend";

const AcceptFriendButton = ({
  userId,
  loadFriends,
}: {
  userId: string;
  loadFriends: Function;
}) => {
  const acceptFriendClick = async () => {
    await acceptFriend(userId);
    await loadFriends(userId);
    // on the click add the friend
    // will need to rerender the list here too...
    // modal for success
  };

  return (
    <div>
      <button onClick={acceptFriendClick}>accept</button>
    </div>
  );
};

export default AcceptFriendButton;
