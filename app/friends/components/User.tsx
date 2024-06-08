import Image from "next/image";
import AcceptFriendButton from "./AcceptFriendButton";

const UserCard = ({
  user,
  loadFriends,
}: {
  user: Friend;
  loadFriends: Function;
}) => {
  return (
    <span className="sm:flex sm:items-center sm:justify-center ">
      <div className="flexbox overflow-y-auto mx-4 px-4 text-left border-2 sm:w-100 border-black rounded-lg h-auto mt-4 bg-tertiary text-black">
        <span className="w-full float-center text-lg">
          <span className="mt-4 mb-4 flex">
            <span className="float-left pt-1">
              {user.direction === "sent" ? (
                <div className="italic">{user.direction}</div>
              ) : (
                <AcceptFriendButton
                  userId={user.id}
                  loadFriends={loadFriends}
                />
              )}
            </span>
            <Image
              src={user.image}
              className="rounded-full float-left mr-4 ml-6"
              alt={`${user.name} photo`}
              width="40"
              height="40"
            />
            <p className="float-center">{user.name}</p>
          </span>
        </span>
      </div>
    </span>
  );
};

export default UserCard;
