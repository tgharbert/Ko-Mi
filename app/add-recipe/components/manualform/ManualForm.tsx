import { useState, useEffect } from "react";
import ListInput from "./ListInput";
import RecipePreview from "./RecipePreview";
import { CloudUpload } from "lucide-react";
import convertTime from "@/utils/convertInputTime";
import Toast from "@/app/components/Toast";
import PrimaryButton from "@/app/components/PrimaryButton";

function ManualForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [servingSize, setServingSize] = useState<string>("1");
  const [cookTime, setCookTime] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [recipe, setRecipe] = useState<CustomRecipe>();
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    setCookTime(convertTime(hours, minutes));
  }, [hours, minutes]);

  const pageChange = () => {
    if (page === 1) {
      if (!name || !description || cookTime === "PT0M") {
        setIsAlert(true);
        return;
      }
    }
    if (page === 2 && ingredients.length === 0) {
      setIsAlert(true);
      return;
    }
    if (page === 3 && instructions.length === 0) {
      setIsAlert(true);
      return;
    }
    if (page === 4) {
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
    }
    setPage(page + 1);
  };

  const revertPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setFileName(e.target.files?.[0]?.name ?? "");
  };

  return (
    <div className="bg-tertiary text-black sm:mx-96 md:mx-40 pt-4 pb-4 rounded-lg border-2 border-black mr-4 ml-4">
      <p className="text-lg pb-4 font-bold">Enter Your Recipe Info:</p>
      <div className="px-8 justify-center flex">
        {isAlert && (
          <Toast message="Not all fields are filled in!" onClose={() => setIsAlert(false)} variant="warning" />
        )}

        {/* Page 1: Details */}
        {page === 1 && (
          <div className="justify-center w-4/5 sm:w-3/5">
            <form>
              <div className="pb-4">
                <p>Recipe Name:</p>
                <input
                  className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
                  type="text"
                  placeholder="Recipe Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <p>Recipe Description:</p>
                <textarea
                  className="text-black rounded-lg px-4 pt-1 pb-1 border-2 border-primary w-full"
                  placeholder="Recipe Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <label>Cook Time:</label>
                <span className="flex justify-center">
                  <div>
                    <input
                      type="number"
                      className="text-black rounded-lg border-2 border-primary pl-2"
                      min="0" max="60" step="1"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                    <label className="mx-2">hours</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      className="text-black rounded-lg border-2 border-primary pl-2"
                      min="0" max="60" step="1"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                    />
                    <label className="mx-2">minutes</label>
                  </div>
                </span>
              </div>
              <div className="pb-4">
                <label>Servings:</label>
                <div className="flex justify-center pb-4 px-8">
                  <select
                    onChange={(e) => setServingSize(e.target.value)}
                    value={servingSize}
                    className="mr-2 border-2 border-primary rounded-lg px-3 text-black"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Page 2: Ingredients */}
        {page === 2 && (
          <ListInput
            items={ingredients}
            onAdd={(item) => setIngredients([...ingredients, item])}
            onRemove={(idx) => setIngredients(ingredients.filter((_, i) => i !== idx))}
            label="Ingredients"
            placeholder="Enter Ingredient"
            useTextarea
          />
        )}

        {/* Page 3: Instructions */}
        {page === 3 && (
          <ListInput
            items={instructions}
            onAdd={(item) => setInstructions([...instructions, item])}
            onRemove={(idx) => setInstructions(instructions.filter((_, i) => i !== idx))}
            label="Instructions"
            placeholder="Enter Instruction"
            useTextarea
          />
        )}

        {/* Page 4: Keywords & Photo */}
        {page === 4 && (
          <div>
            <ListInput
              items={keywords}
              onAdd={(item) => setKeywords([...keywords, item])}
              onRemove={(idx) => setKeywords(keywords.filter((_, i) => i !== idx))}
              label="Keywords"
              placeholder="Enter Keyword..."
            />
            <div className="mt-4 mb-4">
              <p>Upload a Photo:</p>
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
                <p className="pb-2 pt-2">
                  currently selected: <b>{fileName}</b>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Page 5: Preview */}
      {page === 5 && recipe ? (
        <RecipePreview recipe={recipe} />
      ) : (
        <div className="flex justify-center gap-2 px-2">
          {page > 1 && (
            <PrimaryButton onClick={revertPage}>Previous</PrimaryButton>
          )}
          <PrimaryButton onClick={pageChange}>Next Page</PrimaryButton>
        </div>
      )}
    </div>
  );
}

export default ManualForm;
