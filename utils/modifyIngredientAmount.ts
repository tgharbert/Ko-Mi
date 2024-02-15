const modifyIngredientAmount = (string: string, multiplier: number) => {
  const firstSpaceIndex = string.indexOf(' ');
  const firstValue = string.slice(0, firstSpaceIndex)
  if (firstValue.includes('.') || firstValue.includes('/')) {
    // hanldes something like 'tsp.'
    if (firstValue[firstValue.length - 1] === '.') {
      return multiplier + " " + string;
    }
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
