// "use server";
import SignInButton from "./SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

type Session = {
  user: User;
};

type User = {
  name: string;
  email: string;
  image: string;
  id: string;
};

async function Appbar() {
  const defaultSession = {
    user: {
      name: "",
      email: "",
      image: "",
      id: "",
    },
  };

  const session: Session | null =
    (await getServerSession(authOptions)) ?? defaultSession;
  const user = session?.user as User;

  return (
    <header className="flex gap-4 p-4">
      <SignInButton name={user?.name} image={user?.image} session={session} />
    </header>
  );
}

export default Appbar;
