"use server";
import Header from "../components/Header";
import getUsers from "@/lib/getUsers";
import UserList from "./components/UserList";

const Friends = async () => {
  const getAllUsers = async () => {
    "use server";
    const response = await getUsers();
    const userData = await response?.json();
    return userData;
  };

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
