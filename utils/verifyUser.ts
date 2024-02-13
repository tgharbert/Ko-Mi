import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


const verifyUser = async () => {
  // testing for error rate
  // console.log('hit - $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
}

export default verifyUser;