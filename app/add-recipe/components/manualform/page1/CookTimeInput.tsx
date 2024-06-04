function CookTimeInput({
  units,
  valueChange,
  text,
}: {
  units: string;
  valueChange: Function;
  text: string;
}) {
  return (
    <div>
      <input
        type="number"
        className="text-black rounded-lg border-2 border-primary pl-2"
        id="quantity"
        name="quantity"
        min="0"
        max="60"
        step="1"
        value={units}
        onChange={(e) => valueChange(e)}
      ></input>
      <label className="mx-2">{text}</label>
    </div>
  );
}

export default CookTimeInput;
