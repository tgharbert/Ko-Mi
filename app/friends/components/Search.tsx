"use client";
import FriendSearchBar from "./FriendSearchbar";
import { useEffect, useState } from "react";
import findFriends from "@/lib/findFriends";
import FriendSearchResults from "./FriendSearchResults";
import LoadingPage from "@/app/loading";

const Search = ({ loadFriends }: { loadFriends: Function }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [noFriendsFound, setNoFriendsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSearchTerm(e.target.value);
    setNoFriendsFound(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [searchResults]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }
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
          <FriendSearchResults
            searchResults={searchResults}
            loadFriends={loadFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
