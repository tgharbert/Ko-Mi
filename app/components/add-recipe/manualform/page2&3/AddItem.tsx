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
    <div>
      <form onSubmit={(e) => addItem(e, item)}>
        <label>{text}:</label>
        <ul>
          {items.map((ingredient: string, idx) => {
            return <li key={idx}>{ingredient}</li>;
          })}
        </ul>
        <ItemField itemChange={itemChange} item={item} text={text} />
        <button>
          <label>Add Ingredient: </label>
          <AddIcon />
        </button>
      </form>
    </div>
  );
};

export default AddItems;
