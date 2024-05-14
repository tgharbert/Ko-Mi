import { addItemToList } from "@/lib/addItemToList";
import { useFormStatus } from "react-dom";

export async function AddItemField() {
  return (
    <div>
      <form>
        <input
          type="text"
          className="text-black w-1/2 rounded px-4 pt-1 pb-1 "
        ></input>
        <button className="bg-secondary hover:bg-lime-600 rounded ml-2 px-2 pt-1 pb-1">
          Add Item
        </button>
      </form>
    </div>
  );
}
