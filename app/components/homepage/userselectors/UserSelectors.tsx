import RandomButton from "./RandomButton";
import UserToggle from "./UserToggle";

export default function UserSelectors({ random }: { random: string }) {
  return (
    <div>
      <RandomButton random={random} />
      <UserToggle />
    </div>
  );
}
