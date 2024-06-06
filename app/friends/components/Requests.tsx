import UserList from "./UserList";
import getUsers from "@/lib/getUsers";
import Search from "./Search";

const Requests = () => {
  const getAllRequests = async () => {
    "use server";
    const response = await getUsers();
    const userData: User[] = await response?.json();
    return userData;
  };

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
