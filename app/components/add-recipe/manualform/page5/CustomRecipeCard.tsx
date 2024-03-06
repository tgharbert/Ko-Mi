import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { useState, useEffect } from "react";
import InstructionAccordion from "@/app/components/accordions/InstructionAccordion";
import DescriptionAccordion from "@/app/components/accordions/DescriptionAccordion";
// unable to use this because ingredients are formatted as strings from URL
import IngredientAccordion from "@/app/components/accordions/IngredientAccordion";
import { addRecipe } from "@/lib/addRecipe";
import { supabase } from "@/lib/supabase";
import { addCustomRecipe } from "@/lib/addCustomRecipe";

const CustomRecipeCard = ({
  recipe,
}: // submitRecipe,
{
  recipe: CustomRecipe;
  // submitRecipe: Function;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );

  const router = useRouter();

  const handleFileInputChange = () => {
    if (!recipe.photoFile) {
      return;
    }
    const file = recipe.photoFile;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleFileInputChange();
  }, []);

  const handleRecipeSubmission = async () => {
    console.log("inside submission: ", recipe);
    // here is where the problem lies. I cannot pass the photo file to the backend...
    // i'm hacking around it by copying the recipe object and giving it an any type
    // then reassigning the photoFile key to a string of imagePreview.
    // THINK OF ANOTHER WAY...
    // SEND THE RECIPE AND FILE SEPERATELY THEN PERFORM THEIR WORK AT DIFFERENT TIMES??
    let customRecipe: any = recipe;
    // customRecipe.photoFile = imagePreview;

    try {
      const filename = `${recipe.name}Photo`;
      const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filename}`;
      const { error } = await supabase.storage
        .from("images")
        .upload(filename, recipe.photoFile, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) {
        console.error("error from upload: ", error);
      }
      customRecipe.photoFile = recipeAddress;

      await addCustomRecipe(recipe);
      setIsLoading(true);
      router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="mr-20 ml-20 flexbox">
      <div>
        <h1 className="text-xl pt-4 font-semi-bold">{recipe.name}</h1>
      </div>
      <div>
        <p className="text-sm pt-2 italic">by: USERNAME (change later)</p>
      </div>
      <div className="pt-4 pb-4 flex items-center justify-center">
        {typeof imagePreview === "string" && (
          <Image
            width="100"
            height="100"
            src={imagePreview}
            alt="recipe-photo"
            className="rounded-lg"
          />
        )}
      </div>
      <div className="flex justify-center">
        <div className=" mt-7 rounded-lg sm:w-3/5">
          <DescriptionAccordion description={recipe.description} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-7 rounded-lg sm:w-3/5">
          <InstructionAccordion instructions={recipe.instructions} />
        </div>
      </div>
      {/* REFACTOR BASED ON SHARED ACCORDIONS */}
      <div className="flex justify-center">
        <div className="sm:w-3/5">
          <Accordion className="mt-7 rounded-lg">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="font-semibold text-center"
            >
              Recipe Ingredients
            </AccordionSummary>
            <AccordionDetails>
              <ul className="px-2 list-disc text-left">
                {recipe.ingredients.map((ingredient: string, idx: number) => (
                  <li className="pb-4" key={idx}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="mx-4 pt-7 pb-10">
        <button
          onClick={() => handleRecipeSubmission()}
          className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default CustomRecipeCard;
