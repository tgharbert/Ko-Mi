import { auth } from "@/auth";
import { redirect } from "next/navigation";


const verifyUser = async (): Promise<User | null> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session.user as User
}

export default verifyUser;