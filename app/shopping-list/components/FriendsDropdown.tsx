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

  const getUserFriends = async () => {
    let result = await getFriends();
    if (result) {
      setFriends(result);
    } else {
      // error message thrown...
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserFriends();
  }, []);

  const handleChangeFriend = (selection: string) => {
    setFriend(selection);
  };

  const handleShareIngredients = () => {
    shareIngredients(friend);
    openSnackbar();
    handleClose();
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="font-bold text-lg mb-3">
            Select Friend to Share List With:
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
              <option>Select a friend...</option>
              {friends.map((friend) => {
                return (
                  <option value={friend.id} key={friend.id}>
                    {friend.name}
                  </option>
                );
              })}
            </select>
            <span className="ml-6">
              <Button
                variant="contained"
                className="bg-lime-500 "
                onClick={handleShareIngredients}
                color="lime"
              >
                {/* <DeleteIcon className="mr-2" /> */}
                Share
              </Button>
            </span>
          </form>
        </div>
      )}
    </div>
  );
};

export default FriendsDropDown;
