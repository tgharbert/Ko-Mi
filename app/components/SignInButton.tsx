import Image from "next/image";
import MainDropDownMenu from "../friends/components/MainDropdown";

type Session = {
  user: User;
};

type User = {
  name: string;
  email: string;
  image: string;
  id: string;
};

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

  // return (
  //   <div className="flow-root w-full">
  //     {status === "unauthenticated" ? (
  //       <></>
  //     ) : (
  //       <div className="flow-root w-full">
  //         <Image
  //           src={image}
  //           width="40"
  //           height="40"
  //           className="rounded-full float-left mr-4"
  //           alt="profile-image"
  //         />
  //         <div className="float-right">
  //           <MainDropDownMenu />
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default SignInButton;
