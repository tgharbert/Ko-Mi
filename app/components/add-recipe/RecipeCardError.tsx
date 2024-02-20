const RecipeCardError = ({ url }: { url: string }) => {
  // console.log(url);
  return (
    <div>
      <h2 className="text-lg pt-4 pb-4">
        The provided URL ({url}) is not supported
      </h2>
      <p>Please verify the provided URL or try a different one.</p>
    </div>
  );
};

export default RecipeCardError;
