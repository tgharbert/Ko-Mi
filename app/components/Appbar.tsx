import SignInButton from "./SignInButton";
import { auth } from "@/auth";

async function Appbar() {
  const session = await auth();
  const user = session?.user as User | undefined;

  return (
    <header className="flex gap-4 p-4">
      <SignInButton name={user?.name} image={user?.image} session={session} />
    </header>
  );
}

export default Appbar;
