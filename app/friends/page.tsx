"use server";
import Header from "../components/Header";
import getUsers from "@/lib/getUsers";
import UserList from "./components/UserList";
import addFriend from "@/lib/addFriend";

const Friends = async () => {
  const getAllUsers = async () => {
    "use server";
    const response = await getUsers();
    const userData: User[] = await response?.json();
    return userData;
  };

  // const getFriends = async () => {
  //   "use server";
  //   const response = await getFriends();
  //   const friendsData = await response?.json();
  //   console.log(friendsData);
  //   return friendsData;
  // };

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <UserList getUsers={getAllUsers} />
    </div>
  );
};

export default Friends;
