import { useReducer } from "react";
import ListInput from "./ListInput";
import RecipePreview from "./RecipePreview";
import { CloudUpload } from "lucide-react";
import convertTime from "@/utils/convertInputTime";
import Toast from "@/app/components/Toast";
import PrimaryButton from "@/app/components/PrimaryButton";

type FormState = {
  name: string;
  description: string;
  servingSize: string;
  hours: string;
  minutes: string;
  ingredients: string[];
  instructions: string[];
  keywords: string[];
  file: File | null;
  fileName: string;
  isAlert: boolean;
  showPreview: boolean;
};

type ListField = "ingredients" | "instructions" | "keywords";

type FormAction =
  | { type: "SET_FIELD"; field: "name" | "description" | "servingSize" | "hours" | "minutes"; value: string }
  | { type: "ADD_ITEM"; field: ListField; value: string }
  | { type: "REMOVE_ITEM"; field: ListField; index: number }
  | { type: "REORDER_ITEM"; field: ListField; index: number; direction: "up" | "down" }
  | { type: "SET_FILE"; file: File | null; fileName: string }
  | { type: "SET_ALERT"; value: boolean }
  | { type: "SHOW_PREVIEW" };

const initialState: FormState = {
  name: "",
  description: "",
  servingSize: "1",
  hours: "0",
  minutes: "0",
  ingredients: [],
  instructions: [],
  keywords: [],
  file: null,
  fileName: "",
  isAlert: false,
  showPreview: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_ITEM":
      return { ...state, [action.field]: [...state[action.field], action.value] };
    case "REMOVE_ITEM":
      return { ...state, [action.field]: state[action.field].filter((_, i) => i !== action.index) };
    case "REORDER_ITEM": {
      const list = [...state[action.field]];
      const target = action.direction === "up" ? action.index - 1 : action.index + 1;
      [list[action.index], list[target]] = [list[target], list[action.index]];
      return { ...state, [action.field]: list };
    }
    case "SET_FILE":
      return { ...state, file: action.file, fileName: action.fileName };
    case "SET_ALERT":
      return { ...state, isAlert: action.value };
    case "SHOW_PREVIEW":
      return { ...state, showPreview: true };
  }
}

function ManualForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const cookTime = convertTime(state.hours, state.minutes);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    dispatch({ type: "SET_FILE", file: selected ?? null, fileName: selected?.name ?? "" });
  };

  const handleSubmit = () => {
    if (!state.name || !state.description || cookTime === "PT0M" || state.ingredients.length === 0 || state.instructions.length === 0) {
      dispatch({ type: "SET_ALERT", value: true });
      return;
    }
    dispatch({ type: "SHOW_PREVIEW" });
  };

  if (state.showPreview) {
    const recipe: CustomRecipe = {
      name: state.name,
      description: state.description,
      servingSize: state.servingSize,
      cookTime,
      ingredients: state.ingredients,
      instructions: state.instructions,
      keywords: state.keywords,
      photoFile: state.file,
    };
    return (
      <div className="bg-card text-tertiary max-w-2xl mx-auto rounded-lg border border-white/10 p-4 sm:p-6">
        <RecipePreview recipe={recipe} />
      </div>
    );
  }

  return (
    <div className="bg-card text-tertiary max-w-2xl mx-auto rounded-lg border border-white/10 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-tertiary mb-4 text-center">Enter Your Recipe Info</h2>

      {state.isAlert && (
        <Toast message="Please fill in name, description, cook time, ingredients, and instructions." onClose={() => dispatch({ type: "SET_ALERT", value: false })} variant="warning" />
      )}

      <div className="space-y-4 max-w-md mx-auto">
        {/* Details */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-tertiary border-b border-white/10 pb-1 text-center">Details</h3>
          <div>
            <label className="block text-sm mb-1 text-center">Recipe Name</label>
            <input
              className="w-full rounded-md bg-primary text-tertiary placeholder-tertiary/40 px-4 py-2 border border-white/10 focus:border-accent focus:outline-none"
              type="text"
              placeholder="Recipe Name"
              autoFocus
              value={state.name}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-center">Description</label>
            <textarea
              className="w-full rounded-md bg-primary text-tertiary placeholder-tertiary/40 px-4 py-2 border border-white/10 focus:border-accent focus:outline-none resize-y"
              placeholder="Recipe Description"
              rows={3}
              value={state.description}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-center">Keywords</label>
            <ListInput
              items={state.keywords}
              onAdd={(item) => dispatch({ type: "ADD_ITEM", field: "keywords", value: item })}
              onRemove={(idx) => dispatch({ type: "REMOVE_ITEM", field: "keywords", index: idx })}
              onReorder={(idx, dir) => dispatch({ type: "REORDER_ITEM", field: "keywords", index: idx, direction: dir })}
              placeholder="Enter Keyword..."
            />
          </div>
        </section>

        {/* Method */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-tertiary border-b border-white/10 pb-1 text-center">Method</h3>
          <div>
            <label className="block text-sm mb-2 text-center">Ingredients</label>
            <ListInput
              items={state.ingredients}
              onAdd={(item) => dispatch({ type: "ADD_ITEM", field: "ingredients", value: item })}
              onRemove={(idx) => dispatch({ type: "REMOVE_ITEM", field: "ingredients", index: idx })}
              onReorder={(idx, dir) => dispatch({ type: "REORDER_ITEM", field: "ingredients", index: idx, direction: dir })}
              placeholder="Enter Ingredient"
              useTextarea
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-center">Instructions</label>
            <ListInput
              items={state.instructions}
              onAdd={(item) => dispatch({ type: "ADD_ITEM", field: "instructions", value: item })}
              onRemove={(idx) => dispatch({ type: "REMOVE_ITEM", field: "instructions", index: idx })}
              onReorder={(idx, dir) => dispatch({ type: "REORDER_ITEM", field: "instructions", index: idx, direction: dir })}
              placeholder="Enter Instruction"
              useTextarea
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <label className="block text-sm mb-1">Cook Time</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  className="w-16 rounded-md bg-primary text-tertiary px-2 py-2 border border-white/10 focus:border-accent focus:outline-none"
                  min="0" max="60" step="1"
                  value={state.hours}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "hours", value: e.target.value })}
                />
                <span className="text-sm text-tertiary">hrs</span>
                <input
                  type="number"
                  className="w-16 rounded-md bg-primary text-tertiary px-2 py-2 border border-white/10 focus:border-accent focus:outline-none"
                  min="0" max="60" step="1"
                  value={state.minutes}
                  onChange={(e) => dispatch({ type: "SET_FIELD", field: "minutes", value: e.target.value })}
                />
                <span className="text-sm text-tertiary">min</span>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Servings</label>
              <select
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "servingSize", value: e.target.value })}
                value={state.servingSize}
                className="rounded-md bg-primary text-tertiary px-3 py-2 border border-white/10 focus:border-accent focus:outline-none"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Photo */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-tertiary border-b border-white/10 pb-1 mb-3 text-center">Photo</h3>
          <div className="text-center">
            <label className="inline-flex items-center gap-2 bg-pop hover:bg-pop/80 text-tertiary px-4 py-2 rounded-md cursor-pointer transition-colors">
              <CloudUpload size={20} />
              Upload file
              <input
                type="file"
                className="sr-only"
                onChange={handleFileSelected}
              />
            </label>
            {state.fileName && (
              <p className="mt-2 text-sm text-tertiary/70">
                Selected: <span className="font-medium text-tertiary">{state.fileName}</span>
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="flex justify-center mt-4">
        <PrimaryButton onClick={handleSubmit}>Preview Recipe</PrimaryButton>
      </div>
    </div>
  );
}

export default ManualForm;
