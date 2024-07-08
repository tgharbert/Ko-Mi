import groceryStore from "./ingredientValues.mjs";

const removeLastS = (word: string) => {
  let lastLett = word[word.length - 1];
  if (lastLett === "s") {
    word = word.slice(0, word.length - 1);
  } else {
    word = word;
  }
  return word;
};

const removeComma = (word: string) => {
  let lastLett = word[word.length - 1];
  if (lastLett === ",") {
    word = word.slice(0, word.length - 1);
  } else {
    word = word;
  }
  return word;
};


const assignValueToIng = (ingredient: any) => {
  let name = ingredient.name;
  let nameArr = name.split(" ");
  for (let word in nameArr) {
    let currWord = nameArr[word];
    currWord = currWord.toLowerCase();
    currWord = removeComma(currWord);
    currWord = removeLastS(currWord);
    for (let section in groceryStore) {
      if (groceryStore[section][currWord]) {
        let sectionWord = groceryStore[section][currWord];
        ingredient.location = sectionWord
        return ingredient;
      }
    }
    ingredient.location = 'other'
    return ingredient;
  }
};

export default assignValueToIng