const NewRecipeYieldDropdown = ({
  servingsChange,
  servingSize,
}: {
  servingsChange: Function;
  servingSize: string;
}) => {
  return (
    <div className="flexbox justify-center content-center pb-4 px-8">
      <div className="pb-4 px-8 flex justify-center content-center ">
        <select
          onChange={(e) => servingsChange(e.target.value)}
          // defaultValue={1}
          value={String(servingSize)}
          className="mr-2 border-2 border-primary rounded-lg px-3 text-black"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        {/* <label className="ml-2">Servings</label> */}
      </div>
    </div>
  );
};

export default NewRecipeYieldDropdown;
