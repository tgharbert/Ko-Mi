"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Image from "next/image";
import AddIngredientsButton from "./../AddIngredientsButton";
import IngredientAccordion from "../../../accordions/IngredientAccordion";
import InstructionAccordion from "../../../accordions/InstructionAccordion";
import AdditionalAccordion from "../../../accordions/AdditionalAccordion";
import DescriptionAccordion from "../../../accordions/DescriptionAccordion";
import MoreRecipeClick from "./../MoreRecipeClick";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function DesktopRecipeCard({
  recipe,
  user,
}: {
  recipe: Recipe;
  user: User;
}) {
  const [expanded, setExpanded] = useState(true);

  // library that parses punctuation from HTML elements
  const he = require("he");

  return (
    <div className="flex justify-center scrollbar-hide">
      <Card sx={{ maxWidth: 400, minWidth: 400 }}>
        <div className="bg-tertiary">
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title={
              <p className="text-lg font-semibold text-center w-full">
                {he.decode(recipe.name)}
              </p>
            }
          />
          <div className="relative">
            <figure className="overflow-hidden h-48 flex rounded-lg  justify-center mr-2 ml-2  content-center  items-center ">
              <div className="flex content-center  items-center  ">
                <Image
                  className="overflow-hidden rounded-lg "
                  height={188}
                  width={330}
                  src={recipe.image}
                  alt={`image of ${recipe.name}`}
                />
              </div>
            </figure>
          </div>
          <CardContent>
            {recipe.author ? (
              <div className="relative">
                <p className="pb-2 italic text-center">by: {recipe.author}</p>
                <div className="absolute bottom-0 right-0 bg-tertiary pb-4 rounded-2xl">
                  {user.name === recipe.author || user.id === recipe.userId ? (
                    <MoreRecipeClick
                      user={user}
                      added={recipe.userId}
                      author={recipe.author}
                      recipeId={recipe.id}
                      recipeName={recipe.name}
                      uploadedBy={recipe.userId}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <p className="pb-2 italic">No listed author</p>
            )}
            <div className="float-left pt-4">
              <AddIngredientsButton
                recipeYield={recipe.recipeYield}
                recipeIngredients={recipe.ingredients}
              />
            </div>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div className="rounded-lg">
                <DescriptionAccordion
                  description={he.decode(recipe.description)}
                />
              </div>
              <div>
                <IngredientAccordion ingredients={recipe.ingredients} />
              </div>
              <div className="rounded-lg">
                <InstructionAccordion instructions={recipe.instructions} />
              </div>
              <div>
                <AdditionalAccordion
                  url={recipe.url}
                  recipeYield={recipe.recipeYield}
                  publisher={recipe.publisherName}
                  keywords={recipe.keywords}
                />
              </div>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </div>
  );
}
