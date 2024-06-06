import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import addFriend from "@/lib/addFriend";

const Result = ({ user }: { user: UserData }) => {
  const addFriendClick = async () => {
    const result = await addFriend(user.id);
    if (result === "PENDING") {
      // modal like adding ingredients!
      console.log("success!");
    } else {
      console.log("failure!");
    }
  };

  return (
    <span className="sm:flex sm:items-center sm:justify-center ">
      <div className="flexbox overflow-y-auto mx-4 px-4 text-left border-2 sm:w-1/5 border-black rounded-lg h-auto mt-4 bg-tertiary text-black">
        <span className="w-full float-center text-lg">
          <span className="mt-4 mb-4 flex">
            <span className="float-left pt-1">
              <button onClick={() => addFriendClick()}>
                <PersonAddIcon />
              </button>
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

export default Result;
