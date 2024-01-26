const getRecipeObject = (array: any) => {
  if (Array.isArray(array)) {
    getRecipeObject(array[0]);
    if (array[0]["@graph"]) {
      // right now this is just the last? object in the array
      console.log(array[0]["@graph"][array[0]["@graph"].length - 1]);
      return array[0]["@graph"][array[0]["@graph"].length - 1];
    }
  } else {
    return array;
  }
};

export default getRecipeObject;
