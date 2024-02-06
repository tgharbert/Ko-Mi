// import * as React from "react";
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
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

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

  // console.log(ingredientList);

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
      console.log(response);
      // setIsLoading(true);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="mx-10 mt-4">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<h2 className="text-lg font-semibold">{recipe.name}</h2>}
      />
      <div className="overflow-hidden h-48 flex justify-center mr-2 ml-2 ">
        <CardMedia
          className="overflow-hidden rounded-lg border-2 border-black"
          component="img"
          width="100"
          image={recipe.image}
          alt={`image of ${recipe.name}`}
        />
      </div>
      <CardContent>
        {recipe.author ? (
          <p className="pb-2 italic">by: {recipe.author}</p>
        ) : (
          " "
        )}
        <Typography variant="body2" color="text.primary">
          {recipe.description}
        </Typography>
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
          <div className="rounded-lg">
            {/* REFACTOR */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="font-semibold text-center"
              >
                Method
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {recipe.instructions.map((instruction, idx) => {
                    return (
                      <div className="pb-2 pt-2" key={idx}>
                        {instruction}
                      </div>
                    );
                  })}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            {/* REFACTOR */}
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
                  {recipe.ingredients.map((ingredient: Ingredient) => (
                    <li className="pb-4" key={ingredient.id}>
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion className="mt-7 rounded-lg">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="font-semibold text-center"
              >
                Additional Information
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p>
                    <b>Original URL: </b>
                    <a href={recipe.url}>link</a>
                  </p>
                </div>
                <div>
                  <p>
                    <b>Recipe Yield: </b>
                    {recipe.recipeYield}
                  </p>
                </div>
                <div>
                  <p>
                    <b>Original Publisher: </b>
                    {recipe.publisherName}
                  </p>
                </div>
                <div>
                  <p>
                    <b>Keywords: </b>
                    {recipe.keywords.map((keyword, idx) => {
                      return (
                        <p className="italic text-sm" key={idx}>
                          #{keyword}
                        </p>
                      );
                    })}
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
