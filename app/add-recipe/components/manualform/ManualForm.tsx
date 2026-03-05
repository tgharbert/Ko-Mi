import { useState } from "react";
import ListInput from "./ListInput";
import RecipePreview from "./RecipePreview";
import { CloudUpload } from "lucide-react";
import convertTime from "@/utils/convertInputTime";
import Toast from "@/app/components/Toast";
import PrimaryButton from "@/app/components/PrimaryButton";

function ManualForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servingSize, setServingSize] = useState<string>("1");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [recipe, setRecipe] = useState<CustomRecipe>();
  const [isAlert, setIsAlert] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const cookTime = convertTime(hours, minutes);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setFileName(e.target.files?.[0]?.name ?? "");
  };

  const handleSubmit = () => {
    if (!name || !description || cookTime === "PT0M" || ingredients.length === 0 || instructions.length === 0) {
      setIsAlert(true);
      return;
    }
    setRecipe({
      name,
      description,
      servingSize,
      cookTime,
      ingredients,
      instructions,
      keywords,
      photoFile: file,
    });
    setShowPreview(true);
  };

  if (showPreview && recipe) {
    return (
      <div className="bg-tertiary text-black sm:mx-96 md:mx-40 pt-4 pb-4 rounded-lg border-2 border-black mr-4 ml-4">
        <RecipePreview recipe={recipe} />
      </div>
    );
  }

  return (
    <div className="bg-tertiary text-black sm:mx-96 md:mx-40 pt-4 pb-4 rounded-lg border-2 border-black mr-4 ml-4">
      <p className="text-lg pb-4 font-bold">Enter Your Recipe Info:</p>

      {isAlert && (
        <Toast message="Please fill in name, description, cook time, ingredients, and instructions." onClose={() => setIsAlert(false)} variant="warning" />
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block pb-1">Recipe Description:</label>
              <textarea
                className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
                placeholder="Recipe Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                  <label className="ml-2">hours</label>
                </div>
                <div>
                  <input
                    type="number"
                    className="text-black rounded-lg border-2 border-primary pl-2 w-20"
                    min="0" max="60" step="1"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                  <label className="ml-2">minutes</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block pb-1">Servings:</label>
              <select
                onChange={(e) => setServingSize(e.target.value)}
                value={servingSize}
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
            items={ingredients}
            onAdd={(item) => setIngredients([...ingredients, item])}
            onRemove={(idx) => setIngredients(ingredients.filter((_, i) => i !== idx))}
            label="Ingredients"
            placeholder="Enter Ingredient"
            useTextarea
          />
        </section>

        {/* Instructions */}
        <section>
          <ListInput
            items={instructions}
            onAdd={(item) => setInstructions([...instructions, item])}
            onRemove={(idx) => setInstructions(instructions.filter((_, i) => i !== idx))}
            label="Instructions"
            placeholder="Enter Instruction"
            useTextarea
          />
        </section>

        {/* Keywords */}
        <section>
          <ListInput
            items={keywords}
            onAdd={(item) => setKeywords([...keywords, item])}
            onRemove={(idx) => setKeywords(keywords.filter((_, i) => i !== idx))}
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
          {fileName && (
            <p className="pt-2">
              currently selected: <b>{fileName}</b>
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
