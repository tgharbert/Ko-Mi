// at the moment this needs to be looked at and modified based on the data...

const modifyIngredientAmount = (string: string, multiplier: number) => {
  const firstSpaceIndex = string.indexOf(' ');
  const firstValue = string.slice(0, firstSpaceIndex)
  // at the moment this is catching '.' for 'tsp.'
  if (firstValue.includes('.') || firstValue.includes('/')) {
    const baseValue = eval(firstValue)
    const newValue = baseValue * multiplier;
    return newValue + string.slice(firstSpaceIndex)
  } else if (parseInt(firstValue) > 0 || parseInt(firstValue) < 0) {
    const baseValue = parseInt(firstValue);
    const newValue = baseValue * multiplier;
    return newValue + string.slice(firstSpaceIndex)
  } else {
    return multiplier + " " + string
  }
}


export default modifyIngredientAmount;
