import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions'
import { redirect } from "next/navigation";


const verifyUser = async (): Promise<User | null> => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return session.user
}

export default verifyUser;