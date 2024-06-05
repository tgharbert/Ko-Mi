"use client";
import { useEffect, useState } from "react";
import UserCard from "./User";

const UserList = ({ getUsers }: { getUsers: Function }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsersData = async () => {
      let usersData: User[] = await getUsers();
      setUsers(usersData);
    };
    getUsersData();
  }, [getUsers]);

  return (
    <div>
      {users.map((user) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </div>
  );
};

export default UserList;
