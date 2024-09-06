import Link from "next/link";

const UnableToModify = async ({ name }: { name: string }) => {
  return (
    <div>
      <h1>
        You are unable to Modify <b>{name}</b> as you are not the author of this
        recipe.
      </h1>
      <Link href="/">Click here to return home.</Link>
    </div>
  );
};

export default UnableToModify;
