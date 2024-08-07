"use server";
import Header from "../components/Header";
import getUsers from "@/app/friends/data/getUsers";
import FriendsToggle from "./components/FriendsToggle";

const Friends = async () => {
  const getAllRequests = async () => {
    "use server";
    const response = await getUsers();
    const userData: User[] = await response?.json();
    return userData;
  };

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <FriendsToggle getAllRequests={getAllRequests} />
    </div>
  );
};

export default Friends;
