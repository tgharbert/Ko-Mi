import { getServerSession } from "next-auth";
// import { authOptions } from "../app/api/auth/[...nextauth]/route";
import {authOptions} from '@/utils/authOptions'

import { redirect } from "next/navigation";


const verifyUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
}

export default verifyUser;