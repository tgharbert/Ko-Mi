"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { useMediaQuery } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";
import AddIngredientsButton from "./AddIngredientsButton";
import IngredientAccordion from "../../accordions/IngredientAccordion";
import InstructionAccordion from "../../accordions/InstructionAccordion";
import AdditionalAccordion from "../../accordions/AdditionalAccordion";
import DescriptionAccordion from "../../accordions/DescriptionAccordion";
import MoreRecipeClick from "./MoreRecipeClick";
import DesktopRecipeCard from "./desktopcard/DesktopRecipeCard";

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

export default function RecipeReviewCard({
  recipe,
  user,
}: {
  recipe: Recipe;
  user: User;
}) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

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
      <Card sx={{ maxWidth: 345, minWidth: 345 }} className="mt-2 mb-2">
        <div className="bg-tertiary">
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title={
              <div className="inline-flex items-center">
                <p className="text-lg font-semibold line-clamp-1 ">
                  {he.decode(recipe.name)}
                </p>
              </div>
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
                <p className="pb-2 italic">by: {recipe.author}</p>
                <div className="absolute bottom-0 right-0 bg-tertiary pb-4 rounded-2xl">
                  {/* REMOVED THIS CONDITIONAL UNTIL FUNCTIONALITY IS ADDED || user.id !== recipe.userId */}
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
          <CardActions disableSpacing className="-mt-4">
            {!isMobile ? (
              <>
                <ExpandMore
                  expand={expanded}
                  onClick={handleOpen}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  className="justify-center content-center"
                >
                  <DesktopRecipeCard recipe={recipe} user={user} />
                </Dialog>
              </>
            ) : (
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            )}
          </CardActions>
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
