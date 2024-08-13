"use server";
import Header from "../components/Header";
import getUsers from "@/app/friends/data/getUsers";
import FriendsToggle from "./components/FriendsToggle";
import LoadingPage from "../loading";
import { Suspense } from "react";
import verifyUser from "@/utils/verifyUser";

const Friends = async () => {
  await verifyUser();

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
      <Suspense fallback={<LoadingPage />}>
        <FriendsToggle getAllRequests={getAllRequests} />
      </Suspense>
    </div>
  );
};

export default Friends;
