import { useState } from "react";
import NameAndDescription from "./page1/NameAndDescription";
import NextPageButton from "./NextPageButton";
import AddItems from "./page2&3/AddItem";
import convertTime from "@/utils/convertInputTime";

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

  // refactor list add elements to reuse components...

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

  return (
    <div>
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
            text={"Ingredients"}
          />
        )}
        {page === 3 && (
          <AddItems
            addItem={addInstruction}
            items={instructions}
            item={instruction}
            itemChange={instructionChange}
            text={"Instructions"}
          />
        )}
      </div>
      <NextPageButton pageChange={pageChange} />
    </div>
  );
};

export default RecipeForm;
