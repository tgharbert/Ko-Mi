import { useState } from "react";
import NameAndDescription from "./page1/NameAndDescription";
import NextPageButton from "./NextPageButton";
import AddItems from "./page2&3/AddItem";
import KeywordsAndPhoto from "./page4/KeywordsAndPhoto";
import convertTime from "@/utils/convertInputTime";
import { supabase } from "@/lib/supabase";

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

  // update this to submit recipe on page 4, also render diff text
  // also if the page is 4 then we need to redirect to home on submission
  const pageChange = () => {
    if (page === 4) {
      // replace this with the redirect and build the new recipe card from provided info
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  // write a function that submits the recipe and returns us home
  // which will then be invoked when the page is at 4 on the pageChange

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

  // this isn't really needed...
  // should be done later or as a server action when the state is saved..
  // should this function be called on the backend when the rest of the recipe is saved??
  const handleSubmitPhoto = async () => {
    if (!file) {
      return;
    }
    const filename = `${name}Photo`;
    const address = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipes/${filename}`;
    await supabase.storage.from("recipes").upload(filename, file, {
      cacheControl: "3600",
      upsert: true,
    });
    // update??
    // update(address);
    console.log(address);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
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
        {page === 4 && (
          <KeywordsAndPhoto
            keywords={keywords}
            keywordChange={keywordChange}
            keyword={keyword}
            addKeyword={addKeyword}
            handleSubmitPhoto={handleSubmitPhoto}
            handleFileSelected={handleFileSelected}
          />
        )}
      </div>
      <NextPageButton pageChange={pageChange} page={page} />
    </div>
  );
};

export default RecipeForm;
