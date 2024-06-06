"use client";
import FriendSearchBar from "./FriendSearchbar";
import { useState } from "react";
import findFriends from "@/lib/findFriends";
import Results from "./Results";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [noFriendsFound, setNoFriendsFound] = useState(false);

  const onNameChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSearchTerm(e.target.value);
    setNoFriendsFound(false);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm("");
    let users = await findFriends(searchTerm);
    if (users) {
      setSearchResults(users);
    } else {
      setNoFriendsFound(true);
    }
    console.log(searchResults);
  };

  return (
    <div>
      <FriendSearchBar
        searchTerm={searchTerm}
        onNameChange={onNameChange}
        handleSearch={handleSearch}
      />
      <Results searchResults={searchResults} />
    </div>
  );
};

export default Search;
