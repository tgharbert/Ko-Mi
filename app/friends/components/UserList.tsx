"use client";
import { useEffect, useState } from "react";
import UserCard from "./User";

const UserList = ({ getUsers }: { getUsers: Function }) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsersData = async () => {
      let usersData: any[] = await getUsers();
      setUsers(usersData);
    };
    getUsersData();
  }, [getUsers]);

  console.log("users: ", users);

  return (
    <div>
      <div className="text-xl">Users:</div>
      {/* THIS SHOULD FILTER THE CURRENT USER FROM THE LIST */}
      {users.map((user) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </div>
  );
};

export default UserList;
