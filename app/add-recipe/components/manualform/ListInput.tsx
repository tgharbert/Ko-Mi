import { useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";

function ListInput({
  items,
  onAdd,
  onRemove,
  onReorder,
  label,
  placeholder,
  useTextarea = false,
}: {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  onReorder: (index: number, direction: "up" | "down") => void;
  label: string;
  placeholder: string;
  useTextarea?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  const InputElement = useTextarea ? "textarea" : "input";

  return (
    <div>
      <p className="pb-2">{label}:</p>
      <ul>
        {items.map((item, idx) => (
          <li className="flex items-center gap-1 pb-1 text-left" key={idx}>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => onReorder(idx, "up")}
                disabled={idx === 0}
                className="text-gray-400 hover:text-gray-700 disabled:opacity-25"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => onReorder(idx, "down")}
                disabled={idx === items.length - 1}
                className="text-gray-400 hover:text-gray-700 disabled:opacity-25"
              >
                <ChevronDown size={14} />
              </button>
            </div>
            <span className="flex-1">{item}</span>
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-red-400 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex items-start gap-2 mt-2">
        <InputElement
          className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full sm:w-96 resize-y"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <button type="submit" className="pt-1 flex items-center gap-1">
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
}

export default ListInput;
