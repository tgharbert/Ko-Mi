import Image from "next/image";
import MainDropDownMenu from "../friends/components/MainDropdown";
import type { Session } from "next-auth";

const SignInButton = async ({
  image,
  session,
}: {
  name?: string;
  image?: string;
  session: Session | null;
}) => {
  if (session?.user) {
    return (
      <div className="flow-root w-full">
        {session.user.image ? (
          <Image
            src={image || ""}
            width="40"
            height="40"
            className="rounded-full float-left mr-4"
            alt="profile-image"
          />
        ) : (
          <></>
        )}
        <div className="float-right">
          <MainDropDownMenu />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SignInButton;
