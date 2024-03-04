const ItemField = ({
  item,
  itemChange,
}: {
  item: string;
  itemChange: Function;
}) => {
  return (
    <div className="flex">
      <textarea
        className="text-black rounded px-4 pt-1 pb-1 height-auto resize-y"
        placeholder="Enter Ingredient"
        value={item}
        onChange={(e) => itemChange(e)}
        autoFocus
      />
    </div>
  );
};

export default ItemField;
