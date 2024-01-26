const parseNumberAmount = (string: string) => {
  const firstValue = string.split(" ")[0];
  if (firstValue.includes(".") || firstValue.includes("/")) {
    return eval(firstValue);
  } else if (parseInt(firstValue) < 0 || parseInt(firstValue) > 0) {
    return parseInt(firstValue);
  }
  return false;
};

export default parseNumberAmount;
