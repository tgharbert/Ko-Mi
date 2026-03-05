"use client";
import Image from "next/image";
import AddIngredientsButton from "./../AddIngredientsButton";
import IngredientAccordion from "../../../accordions/IngredientAccordion";
import InstructionAccordion from "../../../accordions/InstructionAccordion";
import AdditionalAccordion from "../../../accordions/AdditionalAccordion";
import DescriptionAccordion from "../../../accordions/DescriptionAccordion";
import MoreRecipeClick from "./../MoreRecipeClick";

export default function DesktopRecipeCard({
  recipe,
  user,
}: {
  recipe: Recipe;
  user: User;
}) {
  // library that parses punctuation from HTML elements
  const he = require("he");

  return (
    <div className="flex justify-center scrollbar-hide">
      <div className="max-w-[400px] min-w-[400px] rounded-xl shadow-md overflow-hidden">
        <div className="bg-tertiary text-black">
          {/* Title */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-lg font-semibold text-center">
              {he.decode(recipe.name)}
            </p>
          </div>
          {/* Image */}
          <div className="px-3">
            <figure className="overflow-hidden h-48 flex rounded-lg justify-center items-center">
              <Image
                className="overflow-hidden rounded-lg object-cover"
                height={188}
                width={330}
                src={recipe.image}
                alt={`image of ${recipe.name}`}
              />
            </figure>
          </div>
          {/* Author + More menu */}
          <div className="px-4 pt-3 pb-1">
            {recipe.author ? (
              <div className="flex items-center justify-center relative">
                <p className="italic text-center">by: {recipe.author}</p>
                {(user.name === recipe.author || user.id === recipe.userId) && (
                  <div className="absolute right-0">
                    <MoreRecipeClick
                      user={user}
                      added={recipe.userId}
                      author={recipe.author}
                      recipeId={recipe.id}
                      recipeName={recipe.name}
                      uploadedBy={recipe.userId}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="italic text-center">No listed author</p>
            )}
          </div>
          {/* Add Ingredients */}
          <div className="px-4 pb-2 ml-4">
            <AddIngredientsButton
              recipeYield={recipe.recipeYield}
              recipeIngredients={recipe.ingredients}
            />
          </div>
          {/* Accordion content */}
          <div className="px-4 pb-4 space-y-2">
            <DescriptionAccordion
              description={he.decode(recipe.description)}
            />
            <IngredientAccordion ingredients={recipe.ingredients} />
            <InstructionAccordion instructions={recipe.instructions} />
            <AdditionalAccordion
              url={recipe.url}
              recipeYield={recipe.recipeYield}
              publisher={recipe.publisherName}
              keywords={recipe.keywords}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
