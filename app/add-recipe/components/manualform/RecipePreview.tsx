import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { useState, useEffect } from "react";
import Accordion from "@/app/components/Accordion";
import InstructionAccordion from "@/app/components/accordions/InstructionAccordion";
import DescriptionAccordion from "@/app/components/accordions/DescriptionAccordion";
import { supabase } from "@/lib/supabase";
import { addCustomRecipe } from "@/app/add-recipe/data/addCustomRecipe";
import { Plus } from "lucide-react";
import PrimaryButton from "@/app/components/PrimaryButton";

function RecipePreview({ recipe }: { recipe: CustomRecipe }) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );

  const router = useRouter();

  useEffect(() => {
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
  }, [recipe.photoFile]);

  const handleRecipeSubmission = async () => {
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

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-accent">{recipe.name}</h2>

      <div className="flex justify-center">
        {typeof imagePreview === "string" && (
          <Image
            width={400}
            height={400}
            src={imagePreview}
            alt="recipe-photo"
            className="rounded-lg"
          />
        )}
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <DescriptionAccordion description={recipe.description} />
        <InstructionAccordion instructions={recipe.instructions} />
        <Accordion title="Recipe Ingredients">
          <ul className="px-2 list-disc text-left text-sm space-y-2">
            {recipe.ingredients.map((ingredient: string, idx: number) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </Accordion>
      </div>

      <div className="flex justify-center pt-4 pb-2">
        <PrimaryButton onClick={handleRecipeSubmission} className="inline-flex items-center gap-1">
          Add Recipe
          <Plus size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
}

export default RecipePreview;
