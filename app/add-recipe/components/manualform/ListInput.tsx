import { useState } from "react";
import { Plus, X } from "lucide-react";

function ListInput({
  items,
  onAdd,
  onRemove,
  label,
  placeholder,
  useTextarea = false,
}: {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
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
          <li className="flex items-center gap-2 pb-1 text-left" key={idx}>
            <span className="list-disc">{item}</span>
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
