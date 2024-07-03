import { PrismaClient } from "@prisma/client";
import groceryStore from "./ingredientValues.mjs";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

const getEveryIngredient = async () => {
  const allIngredients = await prisma.ingredient.findMany({});
  await prisma.$disconnect();
  return allIngredients;
};

let allIngredients = await getEveryIngredient();

const removeLastS = (word) => {
  let lastLett = word[word.length - 1];
  if (lastLett === "s") {
    word = word.slice(0, word.length - 1);
  } else {
    word = word;
  }
  return word;
};

// writing the value to the db
const addSection = async (locationData) => {
  console.log(locationData);
  const locations = await prisma.location.createMany({
    data: locationData,
  });
};

const addType = async (locationData) => {
  const data = await prisma.ingredient.createMany({
    where: {
      id: ingredientId,
    },
    types: types.push(locationData.sectionWord),
  });
  console.log("data", data);
};

// loop through the ingredients and assign values - getting 84% of the words atm
const assignValues = async (ingredients) => {
  let secArr = [];
  // let capturedWords = [];
  let unAssigned = [];
  for (let ingredient in ingredients) {
    let name = ingredients[ingredient].name;
    let nameArr = name.split(" ");
    for (let word in nameArr) {
      let currWord = removeLastS(nameArr[word]);
      currWord = currWord.toLowerCase();
      for (let section in groceryStore) {
        if (groceryStore[section][currWord]) {
          let sectionWord = groceryStore[section][currWord];
          let location = {
            ingredientId: ingredients[ingredient].id,
            store: sectionWord,
            home: "",
          };
          secArr.push(location);
          // capturedWords.push(currWord);
          break;
        } else {
          unAssigned.push(currWord);
        }
      }
    }
  }
  // console.log(capturedWords);
  // console.log(unAssigned);
  let test = await addSection(secArr);
  await addType(secArr);
  // console.log(test);
  // console.log(secArr);
  // console.log(ingredients.length);
  // console.log(secArr.length);
};

// need to write a handle plural function

assignValues(allIngredients);

// have an array of ingredient objects with name property
// HOW TO ASSIGN VALUES
// loop through each ingredient
// look at the .name property
// loop through the name property
// loop through the keys on the groceryStore
// check each word and verify whether the word is in the groceryStore

// iterate through the ingredient names and assign values by checking the grocery list obj

// don't worry about shitty schema rn
