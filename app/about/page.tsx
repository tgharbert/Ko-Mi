"use server";
import Header from "../components/Header";
import LoadingPage from "../loading";
import { Suspense } from "react";
import verifyUser from "@/utils/verifyUser";
import Link from "next/link";

const Friends = async () => {
  const user = await verifyUser();

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <div className=" flex justify-center items-center xl:mr-40 xl:ml-40 sm:pr-40 md:pr-4 md:pl-4 sm:pl-40 pr-6 pl-6 text-center sm:pt-60 pt-48">
          <div className="-mt-40 bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 ">
            <p className="text-xl pb-3 font-bold">What is Ko-Mi?</p>
            <p className="pb-3">
              Hi <span className="italic">{user?.name}</span>, my name is Thomas
              and Ko-Mi is my creation!
            </p>
            <p className="pb-3 xl:pr-20 xl:pl-20">
              As both a passionate home cook and an engineer, I set out to
              create a simple, intuitive application. My goal home cooks like
              myself track of their favorite recipes, streamline grocery
              shopping, and share the joy of cooking with other likeminded
              people.
            </p>
            <p className="pb-3 xl:pr-20 xl:pl-20">
              Ko-Mi is a PWA (Progressive Web App). This means that you can
              download it onto your mobile devices just like any other app! Your
              internet browser should have a process that allows you to download
              the page. For more information see this link:
            </p>
            <p className="pb-3 xl:pr-20 xl:pl-20">
              For more information see this link:{" "}
              <Link href="https://www.bitcot.com/how-to-install-a-pwa-to-your-device/#What_is_a_Progressive_Web_Application_PWA">
                <span className="underline text-secondary font-bold">
                  PWA Install Guide
                </span>
              </Link>
            </p>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Friends;
