function ItemField({
  item,
  itemChange,
  text,
}: {
  item: string;
  itemChange: Function;
  text: string;
}) {
  return (
    <div className="flex mt-2">
      <textarea
        className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
        placeholder={`Enter ${text}`}
        value={item}
        onChange={(e) => itemChange(e)}
        autoFocus
      />
    </div>
  );
}

export default ItemField;
