const parseServingSize = (string: string) => {
  const servingArray = string.split(' ');
  servingArray.forEach((word) => {
    if (parseInt(word) < 0 || parseInt(word) > 0) {
      return eval(word)
    }
  })
}
export default parseServingSize;