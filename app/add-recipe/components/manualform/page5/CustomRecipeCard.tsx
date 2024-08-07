import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { useState, useEffect } from "react";
import InstructionAccordion from "@/app/components/accordions/InstructionAccordion";
import DescriptionAccordion from "@/app/components/accordions/DescriptionAccordion";
import { supabase } from "@/lib/supabase";
import { addCustomRecipe } from "@/app/add-recipe/data/addCustomRecipe";
import Button from "@mui/material/Button";
import theme from "@/mui-styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

function CustomRecipeCard({ recipe }: { recipe: CustomRecipe }) {
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
    // here is where the problem lies. I cannot pass the photo file to the backend...
    // i'm hacking around it by copying the recipe object and giving it an any type
    // then reassigning the photoFile key to a string of imagePreview.
    let customRecipe: any = recipe;
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
    <ThemeProvider theme={theme}>
      <div className="mr-20 ml-20 flexbox">
        <div>
          <h1 className="text-xl pt-4 font-semi-bold">{recipe.name}</h1>
        </div>
        <div className="pt-4 pb-4 flex items-center justify-center">
          {typeof imagePreview === "string" && (
            <Image
              width="400"
              height="400"
              src={imagePreview}
              alt="recipe-photo"
              className="rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-center">
          <div className=" rounded-lg sm:w-3/5">
            <DescriptionAccordion description={recipe.description} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg sm:w-3/5">
            <InstructionAccordion instructions={recipe.instructions} />
          </div>
        </div>
        {/* REFACTOR BASED ON SHARED ACCORDIONS */}
        <div className="flex justify-center">
          <div className="sm:w-3/5">
            <Accordion className="rounded-lg">
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
          {/* CHANGE THIS BUTTON */}
          <Button
            variant="contained"
            className=" bg-lime-500"
            onClick={handleRecipeSubmission}
            color="lime"
          >
            Add Recipe
            <AddIcon className="pl-1" />
          </Button>
          {/* <button
          onClick={() => handleRecipeSubmission()}
          className="bg-lime-500 hover:bg-lime-600 rounded mx-3 px-3"
        >
          Add Recipe
        </button> */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CustomRecipeCard;
