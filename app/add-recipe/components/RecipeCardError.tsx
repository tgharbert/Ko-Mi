function RecipeCardError({ url }: { url: string }) {
  // console.log(url);
  return (
    <div className=" bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 mt-8 mr-4 ml-4">
      <h2 className="text-lg pb-4">
        The provided URL ({url}) is not supported
      </h2>
      <p>Please verify the provided URL or try a different one.</p>
    </div>
  );
}

export default RecipeCardError;
