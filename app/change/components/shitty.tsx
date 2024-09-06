"use client";
import { useState, useEffect } from "react";

const ModifyIngredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const [newIngredients, setNewIngredients] = useState<string[]>([]);

  useEffect(() => {
    const justNames: string[] = [];
    ingredients.forEach((ing) => justNames.push(ing.name));
    setNewIngredients(justNames);
    // console.log("justNames: ", justNames);
    console.log("useEffect hit");
  }, [ingredients]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let newIngs: Ingredient[] = [];
    formData.forEach((item: any) => {
      newIngs.push(item);
    });
    // send new ings to the db, delete the old ingredients for the recipe and add these
    console.log("handleSubmit hit: ", newIngs);
  };

  const onDelClick = (e: React.MouseEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    console.log(item);
    const newArray = newIngredients.filter((ing) => ing !== item);
    console.log("new Array: ", newArray);
    changeIngs(newArray);
  };

  const changeIngs = (ings: string[]) => {
    setNewIngredients(ings);
  };

  return (
    <div className="overflow-auto">
      <form onSubmit={handleSubmit} name="ingredientForm">
        {newIngredients.map((ingredient: string, idx: number) => (
          <div className="pb-2" key={idx}>
            <span>
              <textarea
                name={ingredient}
                className="text-black rounded-lg px-4 pt-1 pb-1 height-auto resize-y border-2 border-primary w-full sm:w-96"
                defaultValue={`${ingredient}`}
                // onChange={(e) => onChangeIng(e, ingredient, idx)}
              />
              <button onClick={(e) => onDelClick(e, ingredient)} className="">
                Delete
              </button>
            </span>
          </div>
        ))}
        <button className="ml-2 pt-1 pb-1 text-bold bg-secondary hover:bg-lime-600 rounded-lg px-4 text-white">
          {" "}
          Update Ingredients
        </button>
      </form>
    </div>
  );
};

export default ModifyIngredients;

// async function modifyIngredients(formData: FormData) {
//   "use server";
//   // right now it's typed to 'any' because I'm having issues with fractions...
//   let rawFormData: any[] = [];
//   formData.forEach((item) => rawFormData.push(item));

//   console.log("RAW: ", rawFormData);

//   // thoughts on db interaction:
//   // delete all ingredients for the recipe and replace them with the new ingredients
//   // need to add delete button that deletes text fields?
//   // need to add add button that adds text fields?
// }
