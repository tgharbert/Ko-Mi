import modifyIngredientAmount from "@/utils/modifyIngredientAmount";

describe("modifyIngredientAmount", () => {
  test("multiplies whole number amount", () => {
    expect(modifyIngredientAmount("2 cups flour", 2)).toBe("4 cups flour");
  });

  test("multiplies decimal amount", () => {
    expect(modifyIngredientAmount("1.5 cups sugar", 2)).toBe("3 cups sugar");
  });

  test("multiplies fraction amount", () => {
    expect(modifyIngredientAmount("1/2 cup butter", 2)).toBe("1 cup butter");
  });

  test("prepends multiplier when no leading number", () => {
    expect(modifyIngredientAmount("salt to taste", 2)).toBe("2 salt to taste");
  });

  test("handles unit abbreviations with period (e.g., tsp.)", () => {
    // "tsp." starts with a non-number, so firstValue is "tsp." which ends with "."
    // but it also includes "." so it goes into the first branch
    expect(modifyIngredientAmount("tsp. salt", 3)).toBe("3 tsp. salt");
  });

  test("multiplier of 1 returns same value for whole numbers", () => {
    expect(modifyIngredientAmount("3 eggs", 1)).toBe("3 eggs");
  });

  test("handles fractional multiplier", () => {
    expect(modifyIngredientAmount("4 cups rice", 0.5)).toBe("2 cups rice");
  });
});
