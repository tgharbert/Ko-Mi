import { ChangeEventHandler, FormEventHandler } from "react";

const FriendSearchBar = ({
  searchTerm,
  onNameChange,
  handleSearch,
}: {
  searchTerm: string;
  onNameChange: ChangeEventHandler;
  handleSearch: FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          className="text-black w-1/2 rounded px-4 pt-1 pb-1 sm:w-1/5"
          placeholder="Enter Friend to Search"
          value={searchTerm}
          onChange={onNameChange}
        ></input>
        <button className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
          Search
        </button>
      </form>
    </div>
  );
};

export default FriendSearchBar;
