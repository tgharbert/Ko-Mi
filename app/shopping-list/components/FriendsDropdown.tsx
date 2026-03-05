import { useState } from "react";
import LoadingPage from "@/app/loading";
import PrimaryButton from "@/app/components/PrimaryButton";
import { shareIngredients } from "@/app/shopping-list/data/shareIngredients";
import { useFriends } from "@/app/hooks/useFriends";

const FriendsDropDown = ({
  openSnackbar,
  handleClose,
}: {
  openSnackbar: Function;
  handleClose: Function;
}) => {
  const { friends, isLoading } = useFriends();
  const [friend, setFriend] = useState("");

  const handleChangeFriend = (selection: string) => {
    setFriend(selection);
  };

  const handleShareIngredients = async () => {
    const response = await shareIngredients(friend);
    // need to handle error for other cases??
    if (response === "success") {
      openSnackbar();
    }
    handleClose();
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className=" text-center">
          <div className="px-10 pt-4 pb-4 justify-center flex font-bold ">
            Share list with:
          </div>
          <form>
            <select
              className="text-tertiary bg-secondary hover:bg-primary rounded px-2 pt-1 pb-1 "
              onChange={(e) => {
                handleChangeFriend(e.target.value);
              }}
              defaultValue={"Select Friend"}
              aria-label="filter categories"
            >
              {friends.length === 0 ? (
                <option>You have no friends 😭</option>
              ) : (
                <option>Select a friend...</option>
              )}
              {friends.map((friend) => {
                return (
                  <option value={friend.id} key={friend.id}>
                    {friend.name}
                  </option>
                );
              })}
            </select>
            <div className="pt-4 float-center">
              <PrimaryButton onClick={handleShareIngredients}>
                Share
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FriendsDropDown;
