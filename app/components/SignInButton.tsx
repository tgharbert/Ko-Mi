import Image from "next/image";
import MainDropDownMenu from "../friends/components/MainDropdown";

const SignInButton = async ({
  image,
  session,
}: {
  name: string;
  image: string;
  session: Session;
}) => {
  if (session && session.user.name !== "") {
    return (
      <div className="flow-root w-full">
        {session.user.image !== "" ? (
          <Image
            src={image}
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
    <></>;
  }
};

export default SignInButton;
