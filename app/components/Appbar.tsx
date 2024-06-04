import SignInButton from "./SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function Appbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  return (
    <header className="flex gap-4 p-4">
      <SignInButton name={user?.name} image={user?.image} />
    </header>
  );
}

export default Appbar;
