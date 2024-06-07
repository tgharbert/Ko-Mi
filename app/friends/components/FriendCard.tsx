import Image from "next/image";

const FriendCard = ({ friend }: { friend: User }) => {
  return (
    <span className="sm:flex sm:items-center sm:justify-center ">
      <div className="flexbox overflow-y-auto mx-4 px-4 text-left border-2  border-black rounded-lg h-auto mt-4 bg-tertiary text-black">
        <span className="w-full float-center text-lg">
          <span className="mt-4 mb-4 flex">
            <Image
              src={friend.image}
              className="rounded-full float-left mr-4 ml-6"
              alt={`${friend.name} photo`}
              width="40"
              height="40"
            />
            <p className="float-center">{friend.name}</p>
          </span>
        </span>
      </div>
    </span>
  );
};

export default FriendCard;
