const ItemField = ({
  item,
  itemChange,
  text,
}: {
  item: string;
  itemChange: Function;
  text: string;
}) => {
  return (
    <div className="flex">
      <textarea
        className="text-black rounded px-4 pt-1 pb-1 height-auto resize-y"
        placeholder={`Enter ${text}`}
        value={item}
        onChange={(e) => itemChange(e)}
        autoFocus
      />
    </div>
  );
};

export default ItemField;
