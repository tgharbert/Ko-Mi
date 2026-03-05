"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import AddIngredientsButton from "./AddIngredientsButton";
import IngredientAccordion from "../../accordions/IngredientAccordion";
import InstructionAccordion from "../../accordions/InstructionAccordion";
import AdditionalAccordion from "../../accordions/AdditionalAccordion";
import DescriptionAccordion from "../../accordions/DescriptionAccordion";
import MoreRecipeClick from "./MoreRecipeClick";
import DesktopRecipeCard from "./desktopcard/DesktopRecipeCard";

export default function RecipeReviewCard({
  recipe,
  user,
}: {
  recipe: Recipe;
  user: User;
}) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // library that parses punctuation from HTML elements
  const he = require("he");

  return (
    <div className="flex justify-center">
      <div className="mt-2 mb-2 max-w-[345px] min-w-[345px] rounded-xl shadow-md overflow-hidden">
        <div className="bg-tertiary text-black">
          {/* Title */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-lg font-semibold line-clamp-1">
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
          {/* Add Ingredients + Expand */}
          <div className="flex items-center justify-between px-4 pb-2">
            <div className="ml-4">
              <AddIngredientsButton
                recipeYield={recipe.recipeYield}
                recipeIngredients={recipe.ingredients}
              />
            </div>
            {!isMobile ? (
              <>
                <button
                  onClick={handleOpen}
                  aria-expanded={expanded}
                  aria-label="show more"
                  className="p-2 transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <ChevronDown size={24} />
                </button>
                <dialog
                  ref={dialogRef}
                  onClose={handleClose}
                  onClick={(e) => { if (e.target === dialogRef.current) handleClose(); }}
                  className="rounded-xl backdrop:bg-black/50 p-0"
                >
                  <DesktopRecipeCard recipe={recipe} user={user} />
                </dialog>
              </>
            ) : (
              <button
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                className="p-2 transition-transform duration-200"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <ChevronDown size={24} />
              </button>
            )}
          </div>
          {/* Expandable content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-4 pb-4 divide-y divide-gray-200">
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
    </div>
  );
}
