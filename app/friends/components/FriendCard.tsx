import Image from "next/image";

const FriendCard = ({ friend }: { friend: User }) => {
  return (
    <div className="flexbox overflow-y-auto mx-4 px-4 text-left border-2  border-black rounded-lg h-auto mt-4 bg-tertiary text-black w-80 sm:w-1/5 pt-4 pb-4">
      <span className="text-lg ">
        <span className="mt-4 mb-4">
          <Image
            src={friend.image}
            className="rounded-full float-left mr-2 ml-2"
            alt={`${friend.name} photo`}
            width="40"
            height="40"
          />
          <p className="float-center ">{friend.name}</p>
        </span>
      </span>
    </div>
  );
};

export default FriendCard;
