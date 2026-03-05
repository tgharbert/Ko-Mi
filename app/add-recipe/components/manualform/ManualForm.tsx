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
      <div className="bg-tertiary text-black sm:mx-96 md:mx-40 pt-4 pb-4 rounded-lg border-2 border-black mr-4 ml-4">
        <RecipePreview recipe={recipe} />
      </div>
    );
  }

  return (
    <div className="bg-tertiary text-black sm:mx-96 md:mx-40 pt-4 pb-4 rounded-lg border-2 border-black mr-4 ml-4">
      <p className="text-lg pb-4 font-bold">Enter Your Recipe Info:</p>

      {state.isAlert && (
        <Toast message="Please fill in name, description, cook time, ingredients, and instructions." onClose={() => dispatch({ type: "SET_ALERT", value: false })} variant="warning" />
      )}

      <div className="px-8 space-y-6">
        {/* Details */}
        <section>
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block pb-1">Recipe Name:</label>
              <input
                className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
                type="text"
                placeholder="Recipe Name"
                autoFocus
                value={state.name}
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
              />
            </div>
            <div>
              <label className="block pb-1">Recipe Description:</label>
              <textarea
                className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
                placeholder="Recipe Description"
                value={state.description}
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })}
              />
            </div>
            <div>
              <label className="block pb-1">Cook Time:</label>
              <div className="flex justify-center gap-4">
                <div>
                  <input
                    type="number"
                    className="text-black rounded-lg border-2 border-primary pl-2 w-20"
                    min="0" max="60" step="1"
                    value={state.hours}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "hours", value: e.target.value })}
                  />
                  <label className="ml-2">hours</label>
                </div>
                <div>
                  <input
                    type="number"
                    className="text-black rounded-lg border-2 border-primary pl-2 w-20"
                    min="0" max="60" step="1"
                    value={state.minutes}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "minutes", value: e.target.value })}
                  />
                  <label className="ml-2">minutes</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block pb-1">Servings:</label>
              <select
                onChange={(e) => dispatch({ type: "SET_FIELD", field: "servingSize", value: e.target.value })}
                value={state.servingSize}
                className="border-2 border-primary rounded-lg px-3 text-black"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section>
          <ListInput
            items={state.ingredients}
            onAdd={(item) => dispatch({ type: "ADD_ITEM", field: "ingredients", value: item })}
            onRemove={(idx) => dispatch({ type: "REMOVE_ITEM", field: "ingredients", index: idx })}
            onReorder={(idx, dir) => dispatch({ type: "REORDER_ITEM", field: "ingredients", index: idx, direction: dir })}
            label="Ingredients"
            placeholder="Enter Ingredient"
            useTextarea
          />
        </section>

        {/* Instructions */}
        <section>
          <ListInput
            items={state.instructions}
            onAdd={(item) => dispatch({ type: "ADD_ITEM", field: "instructions", value: item })}
            onRemove={(idx) => dispatch({ type: "REMOVE_ITEM", field: "instructions", index: idx })}
            onReorder={(idx, dir) => dispatch({ type: "REORDER_ITEM", field: "instructions", index: idx, direction: dir })}
            label="Instructions"
            placeholder="Enter Instruction"
            useTextarea
          />
        </section>

        {/* Keywords */}
        <section>
          <ListInput
            items={state.keywords}
            onAdd={(item) => dispatch({ type: "ADD_ITEM", field: "keywords", value: item })}
            onRemove={(idx) => dispatch({ type: "REMOVE_ITEM", field: "keywords", index: idx })}
            onReorder={(idx, dir) => dispatch({ type: "REORDER_ITEM", field: "keywords", index: idx, direction: dir })}
            label="Keywords"
            placeholder="Enter Keyword..."
          />
        </section>

        {/* Photo */}
        <section>
          <p className="pb-1">Upload a Photo:</p>
          <label className="inline-flex items-center gap-2 bg-secondary hover:bg-red-700 text-tertiary px-4 py-2 rounded cursor-pointer">
            <CloudUpload size={20} />
            Upload file
            <input
              type="file"
              className="sr-only"
              onChange={handleFileSelected}
            />
          </label>
          {state.fileName && (
            <p className="pt-2">
              currently selected: <b>{state.fileName}</b>
            </p>
          )}
        </section>
      </div>

      <div className="flex justify-center pt-6 pb-2">
        <PrimaryButton onClick={handleSubmit}>Preview Recipe</PrimaryButton>
      </div>
    </div>
  );
}

export default ManualForm;
