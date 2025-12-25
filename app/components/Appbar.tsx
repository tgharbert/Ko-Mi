import SignInButton from "./SignInButton";
import { auth } from "@/auth";

async function Appbar() {
  const defaultSession = {
    user: {
      name: "",
      email: "",
      image: "",
      id: "",
    },
  };

  const session = (await auth()) ?? defaultSession;
  const user = session?.user as User;

  return (
    <header className="flex gap-4 p-4">
      <SignInButton name={user?.name} image={user?.image} session={session} />
    </header>
  );
}

export default Appbar;
