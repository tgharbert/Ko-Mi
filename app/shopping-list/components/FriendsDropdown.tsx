import { useState, useEffect } from "react";
import getFriends from "@/lib/getFriends";
import { Button } from "@mui/material";
import LoadingPage from "@/app/loading";
import { shareIngredients } from "@/lib/shareIngredients";

const FriendsDropDown = ({
  openSnackbar,
  handleClose,
}: {
  openSnackbar: Function;
  handleClose: Function;
}) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [friend, setFriend] = useState("");
  const [isErrGettingFriends, setIsErrGettingFriends] = useState(false);

  const getUserFriends = async () => {
    let result = await getFriends();
    if (result) {
      setFriends(result);
    } else {
      // error message thrown...
      setIsErrGettingFriends(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserFriends();
  }, []);

  const handleChangeFriend = (selection: string) => {
    setFriend(selection);
  };

  const handleShareIngredients = async () => {
    const response = await shareIngredients(friend);
    console.log(response);
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
              <Button
                variant="contained"
                className="bg-lime-500 "
                onClick={handleShareIngredients}
                color="lime"
              >
                Share List
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FriendsDropDown;
