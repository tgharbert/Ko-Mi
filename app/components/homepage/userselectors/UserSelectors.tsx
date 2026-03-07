import RandomButton from "./RandomButton";
import UserToggle from "./UserToggle";

export default function UserSelectors({ random }: { random: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3 pb-2">
      <UserToggle />
      <RandomButton random={random} />
    </div>
  );
}
