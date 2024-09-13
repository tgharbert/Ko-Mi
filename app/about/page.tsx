"use server";
import Header from "../components/Header";
import LoadingPage from "../loading";
import { Suspense } from "react";
import verifyUser from "@/utils/verifyUser";
import Link from "next/link";

const Friends = async () => {
  await verifyUser();

  return (
    <div className="text-center pb-10">
      <div className="-mt-12">
        <Header />
      </div>
      <Suspense fallback={<LoadingPage />}>
        <div className=" flex justify-center items-center sm:pr-40 md:pr-4 md:pl-4 sm:pl-40 pr-6 pl-6 text-center sm:pt-60 pt-48">
          <div className="-mt-40 bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 ">
            <p className="text-xl pb-3 font-bold">What is Ko-Mi?</p>
            <p className="pb-3">
              Hi, my name is Thomas and Ko-Mi is my creation!
            </p>
            <p className="pb-3">
              As a passionate home cook and engineer, I wanted to create a
              simple, streamlined application that would help me keep track of
              my favorite recipes, help me build shopping lists, and share my
              passion with other home cooks. In building this project, I wanted
              to create something that was intuitive for anybody to use.
            </p>
            <p className="pb-3">
              Ko-Mi is a PWA (Progressive Web App), which means that you can
              download it onto your mobile devices just like any other app. Your
              internet browser should have a process that allows you to download
              the page. For more information see this link:
            </p>
            <Link href="https://www.bitcot.com/how-to-install-a-pwa-to-your-device/#What_is_a_Progressive_Web_Application_PWA">
              <p className="underline text-secondary font-bold">
                PWA Install Guide
              </p>
            </Link>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Friends;
