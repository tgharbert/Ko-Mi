import AddIcon from "@mui/icons-material/Add";
import ItemField from "./ItemField";

const AddItems = ({
  addItem,
  items,
  item,
  itemChange,
  text,
}: {
  addItem: Function;
  items: string[];
  item: string;
  itemChange: Function;
  text: string;
}) => {
  return (
    <div className="">
      <form onSubmit={(e) => addItem(e, item)}>
        <p className="pb-2">{text}s:</p>
        <ul>
          {items.map((ingredient: string, idx) => {
            return (
              <li className="px-2 list-disc text-left" key={idx}>
                {ingredient}
              </li>
            );
          })}
        </ul>
        <ItemField itemChange={itemChange} item={item} text={text} />
        <button className="pt-2 pb-2 mx-4 items-center ">
          <label>Add {text}: </label>
          <AddIcon />
        </button>
      </form>
    </div>
  );
};

export default AddItems;
