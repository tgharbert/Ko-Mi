import { useState } from "react";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";

function ListInput({
  items,
  onAdd,
  onRemove,
  onReorder,
  placeholder,
  useTextarea = false,
}: {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  onReorder: (index: number, direction: "up" | "down") => void;
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
      {items.length > 0 && (
        <ul className="space-y-1 mb-3">
          {items.map((item, idx) => (
            <li
              className="flex items-center gap-1 rounded-md bg-primary/30 px-3 py-1.5 text-left text-sm"
              key={idx}
            >
              <div className="flex flex-col -my-1">
                <button
                  type="button"
                  onClick={() => onReorder(idx, "up")}
                  disabled={idx === 0}
                  className="text-tertiary/40 hover:text-accent disabled:opacity-25 transition-colors"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onReorder(idx, "down")}
                  disabled={idx === items.length - 1}
                  className="text-tertiary/40 hover:text-accent disabled:opacity-25 transition-colors"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
              <span className="flex-1 text-tertiary">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="text-secondary/60 hover:text-secondary transition-colors"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="flex items-start gap-2 max-w-sm mx-auto">
        <InputElement
          className="flex-1 rounded-md bg-primary/40 text-tertiary placeholder-tertiary/40 px-4 py-2 border border-white/10 focus:border-accent focus:outline-none resize-y"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="text-accent hover:text-accent-hover pt-2 transition-colors"
        >
          <Plus size={22} />
        </button>
      </form>
    </div>
  );
}

export default ListInput;
