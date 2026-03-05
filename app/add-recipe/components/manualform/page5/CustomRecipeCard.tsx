import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { useState, useEffect } from "react";
import InstructionAccordion from "@/app/components/accordions/InstructionAccordion";
import DescriptionAccordion from "@/app/components/accordions/DescriptionAccordion";
import { supabase } from "@/lib/supabase";
import { addCustomRecipe } from "@/app/add-recipe/data/addCustomRecipe";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "@/app/components/PrimaryButton";

function CustomRecipeCard({ recipe }: { recipe: CustomRecipe }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const handleFileInputChange = () => {
      if (!recipe.photoFile) {
        setImagePreview(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ko-mi_recipe-placeholder.png`
        );
        return;
      }
      const file = recipe.photoFile;
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    handleFileInputChange();
  }, [recipe.photoFile]);

  // is this where I handle a null recipe???
  const handleRecipeSubmission = async () => {
    // here is where the problem lies. I cannot pass the photo file to the backend...
    // i'm hacking around it by copying the recipe object and giving it an any type
    // then reassigning the photoFile key to a string of imagePreview.
    let customRecipe: any = recipe;
    try {
      if (recipe.photoFile === null) {
        const recipeAddress = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/ko-mi_recipe-placeholder.png`;
        customRecipe.photoFile = recipeAddress;
      } else {
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
      }
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
    <div className="flexbox mr-8 ml-8 sm:mr-20 sm:ml-20 md:ml-2 md:mr-2">
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
        <div className="w-full md:w-full sm:w-2/5">
          <DescriptionAccordion description={recipe.description} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-full sm:w-2/5">
          <InstructionAccordion instructions={recipe.instructions} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-full sm:w-2/5">
          <details className="rounded-lg border border-gray-200 bg-white text-black">
            <summary className="px-4 py-3 font-semibold cursor-pointer">
              Recipe Ingredients
            </summary>
            <div className="px-4 pb-4">
              <ul className="px-2 list-disc text-left">
                {recipe.ingredients.map((ingredient: string, idx: number) => (
                  <li className="pb-4" key={idx}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
      <div className="mx-4 pt-7 pb-10">
        <PrimaryButton onClick={handleRecipeSubmission}>
          Add Recipe
          <AddIcon className="pl-1" />
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CustomRecipeCard;
