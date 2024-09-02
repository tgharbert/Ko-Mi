"use server";
import verifyUser from "@/utils/verifyUser";
import Header from "@/app/components/Header";

export default async function ChangeRecipe({
  params,
}: {
  params: { slug: string };
}) {
  await verifyUser();

  // I need to figure out a way to prevent users from altering indredients by manually entering url.

  // do checks on the backend to ensure the user should be able to edit the recipe I'm retrieving

  return (
    <div className="text-center flexbox content-center">
      <div className="-mt-12">
        <Header />
      </div>
      <h1>HIIIII {params.slug} </h1>
    </div>
  );
}
