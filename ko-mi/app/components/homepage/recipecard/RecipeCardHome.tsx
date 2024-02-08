// import * as React from "react";
"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

import IngredientAccordion from "../../accordions/IngredientAccordion";
import InstructionAccordion from "../../accordions/InstructionAccordion";
import AdditionalAccordion from "../../accordions/AdditionalAccordion";
import DescriptionAccordion from "../../accordions/DescriptionAccordion";

type Recipe = {
  aggregateRating: number;
  author: string;
  categotry: string[];
  cookTime: string;
  description: string;
  id: number;
  image: string;
  instructions: string[];
  ingredients: Ingredient[];
  keywords: string[];
  name: string;
  prepTime: string;
  publisherLogo: string;
  publisherName: string;
  publisherUrl: string;
  recipeYield: string;
  totalTime: string;
  url: string;
};

type Ingredient = {
  id: number;
  name: string;
  locationId: number;
  recipeId: number;
  types: string[];
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ recipe }: { recipe: Recipe }) {
  const [expanded, setExpanded] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // route to /api/add-ingredient
  const handleAddIngredients = async () => {
    setIngredientList(recipe.ingredients);
    try {
      const response = await fetch("/api/add-ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredientList),
      });
      // THIS SHOULD HAVE AN 'ADDED' MESSAGE
      console.log(response);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }} className="mx-10 mt-4">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<h2 className="text-lg font-semibold">{recipe.name}</h2>}
      />
      <div className="overflow-hidden h-48 flex rounded-lg border-2 border-black justify-center mr-2 ml-2  content-center  items-center ">
        <div className="flex content-center  items-center  ">
          <Image
            className="overflow-hidden rounded-lg "
            height={188}
            width={330}
            src={recipe.image}
            alt={`image of ${recipe.name}`}
          />
        </div>
      </div>
      <CardContent>
        {recipe.author ? (
          <p className="pb-2 italic">by: {recipe.author}</p>
        ) : (
          <p className="pb-2 italic">No listed author</p>
        )}
        <button onClick={handleAddIngredients} className="float-left pt-4">
          Add Ingredients
        </button>
      </CardContent>
      <CardActions disableSpacing className="-mt-4">
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="rounded-lg pb-">
            <DescriptionAccordion description={recipe.description} />
          </div>
          <div className="rounded-lg">
            <InstructionAccordion instructions={recipe.instructions} />
          </div>
          <div>
            <IngredientAccordion ingredients={recipe.ingredients} />
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
    </Card>
  );
}
