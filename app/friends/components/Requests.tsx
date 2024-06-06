"use client";
import { useState, useEffect } from "react";
import UserList from "./UserList";
import getUsers from "@/lib/getUsers";
import Search from "./Search";
import LoadingPage from "@/app/loading";

const Requests = ({ getAllRequests }: { getAllRequests: Function }) => {
  // USE LOADING STATE AND PASS IT TO FOR RERENDER??

  // const getAllRequests = async () => {
  //   "use server";
  //   const response = await getUsers();
  //   const userData: User[] = await response?.json();
  //   return userData;
  // };

  return (
    <div>
      <div>
        <Search />
      </div>
      <div>
        <UserList getAllRequests={getAllRequests} />
      </div>
    </div>
  );
};

export default Requests;
