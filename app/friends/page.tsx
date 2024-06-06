"use server";
import Header from "../components/Header";
import getUsers from "@/lib/getUsers";
import UserList from "./components/UserList";
import Requests from "./components/Requests";

const Friends = async () => {
  // const getAllUsers = async () => {
  //   "use server";
  //   const response = await getUsers();
  //   const userData: User[] = await response?.json();
  //   return userData;
  // };

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
      {/* FRIENDS */}
      <Requests getAllRequests={getAllRequests} />
    </div>
  );
};

export default Friends;
