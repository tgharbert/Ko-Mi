"use client";
import FriendSearchBar from "./FriendSearchbar";
import { useEffect, useState } from "react";
import findFriends from "@/lib/findFriends";
import Results from "./Results";
import LoadingPage from "@/app/loading";
import addFriend from "@/lib/addFriend";

const Search = ({ loadFriends }: { loadFriends: Function }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [noFriendsFound, setNoFriendsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSearchTerm(e.target.value);
    setNoFriendsFound(false);
  };

  console.log(searchResults);

  useEffect(() => {
    setIsLoading(false);
  }, [searchResults]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
    let users = await findFriends(searchTerm);
    if (users) {
      setSearchResults(users);
    } else {
      setNoFriendsFound(true);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <FriendSearchBar
            searchTerm={searchTerm}
            onNameChange={onNameChange}
            handleSearch={handleSearch}
          />
          <Results searchResults={searchResults} loadFriends={loadFriends} />
        </div>
      )}
    </div>
  );
};

export default Search;
