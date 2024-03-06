import { useState } from "react";
import NameAndDescription from "./page1/NameAndDescription";
import NextPageButton from "./NextPageButton";
import AddItems from "./page2&3/AddItem";
import KeywordsAndPhoto from "./page4/KeywordsAndPhoto";
import convertTime from "@/utils/convertInputTime";
import buildCustomRecipe from "@/lib/buildCustomRecipe";
import CustomRecipeCard from "./page5/CustomRecipeCard";

const RecipeForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [servingSize, setServingSize] = useState<string>("1");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [recipe, setRecipe] = useState<CustomRecipe>();

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const servingsChange = (value: string) => {
    setServingSize(value);
  };

  const pageChange = () => {
    if (page === 4) {
      let customRecipe = buildCustomRecipe(
        name,
        description,
        servingSize,
        cookTime,
        ingredients,
        instructions,
        keywords,
        file
      );
      setRecipe(customRecipe);
    }
    setPage(page + 1);
  };

  const formatTime = (hours: string, minutes: string) => {
    const formattedTime = convertTime(hours, minutes);
    setCookTime(formattedTime);
  };

  const addIngredient = (
    e: React.ChangeEvent<HTMLInputElement>,
    ingredient: string
  ) => {
    e.preventDefault();
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  };

  const ingredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const addInstruction = (
    e: React.ChangeEvent<HTMLInputElement>,
    instruction: string
  ) => {
    e.preventDefault();
    setInstructions([...instructions, instruction]);
    setInstruction("");
  };

  const instructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstruction(e.target.value);
  };

  const addKeyword = (
    e: React.ChangeEvent<HTMLInputElement>,
    keyword: string
  ) => {
    e.preventDefault();
    setKeywords([...keywords, keyword]);
    setKeyword("");
  };

  const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setFileName(e.target.files?.[0].name ?? "");
  };

  return (
    <div>
      <p className="text-lg pb-4">Enter your recipe info:</p>
      <div className="px-8 justify-center flex">
        {page === 1 && (
          <NameAndDescription
            nameChange={nameChange}
            descriptionChange={descriptionChange}
            name={name}
            description={description}
            servingsChange={servingsChange}
            servingSize={servingSize}
            formatTime={formatTime}
          />
        )}
        {page === 2 && (
          <AddItems
            addItem={addIngredient}
            items={ingredients}
            item={ingredient}
            itemChange={ingredientChange}
            text={"Ingredient"}
          />
        )}
        {page === 3 && (
          <AddItems
            addItem={addInstruction}
            items={instructions}
            item={instruction}
            itemChange={instructionChange}
            text={"Instruction"}
          />
        )}
        {page === 4 && (
          <KeywordsAndPhoto
            keywords={keywords}
            keywordChange={keywordChange}
            keyword={keyword}
            addKeyword={addKeyword}
            handleFileSelected={handleFileSelected}
            fileName={fileName}
          />
        )}
      </div>
      {page === 5 && recipe !== undefined ? (
        <CustomRecipeCard recipe={recipe} />
      ) : (
        <NextPageButton pageChange={pageChange} />
      )}
    </div>
  );
};

export default RecipeForm;
