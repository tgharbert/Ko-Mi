import consolidateIngredients, {
  normalizeItem,
  formatQuantity,
} from "@/utils/consolidateIngredients";

function makeIngredient(
  id: number,
  name: string,
  location: string | null = "produce"
): IngredientWithLocation {
  return { id, ingredientId: null, checked: false, name, location };
}

describe("normalizeItem", () => {
  test("strips trailing comma descriptors", () => {
    expect(normalizeItem("garlic, minced")).toBe("garlic");
  });

  test("strips parentheticals", () => {
    expect(normalizeItem("tomatoes (diced)")).toBe("tomato");
  });

  test("removes trailing s for basic plurals", () => {
    expect(normalizeItem("onions")).toBe("onion");
  });

  test("normalizes whitespace", () => {
    expect(normalizeItem("  olive  oil  ")).toBe("olive oil");
  });
});

describe("formatQuantity", () => {
  test("whole numbers", () => {
    expect(formatQuantity(3)).toBe("3");
  });

  test("common fractions", () => {
    expect(formatQuantity(0.5)).toBe("1/2");
    expect(formatQuantity(0.25)).toBe("1/4");
    expect(formatQuantity(0.75)).toBe("3/4");
  });

  test("mixed numbers", () => {
    expect(formatQuantity(1.5)).toBe("1 1/2");
    expect(formatQuantity(2.25)).toBe("2 1/4");
  });

  test("non-standard decimals", () => {
    expect(formatQuantity(1.37)).toBe("1.37");
  });
});

describe("consolidateIngredients", () => {
  test("returns single items unchanged", () => {
    const ingredients = [makeIngredient(1, "2 cups flour")];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("2 cups flour");
    expect(result[0].ids).toEqual([1]);
  });

  test("combines same ingredient with same unit", () => {
    const ingredients = [
      makeIngredient(1, "2 cups flour"),
      makeIngredient(2, "1 cup flour"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("3 cup flour");
    expect(result[0].ids).toEqual([1, 2]);
  });

  test("combines fractions", () => {
    const ingredients = [
      makeIngredient(1, "1/2 cup sugar"),
      makeIngredient(2, "1/4 cup sugar"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("3/4 cup sugar");
    expect(result[0].ids).toEqual([1, 2]);
  });

  test("combines convertible units (tbsp + tsp)", () => {
    const ingredients = [
      makeIngredient(1, "1 tbsp olive oil"),
      makeIngredient(2, "1 tsp olive oil"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    // 1 tbsp = 3 tsp, total = 4 tsp = 1 1/3 tbsp
    // Should pick tbsp as display unit since total >= 1 tbsp
    expect(result[0].ids).toEqual([1, 2]);
    expect(result[0].name).toContain("tbsp");
    expect(result[0].name).toContain("olive oil");
  });

  test("keeps different ingredients separate", () => {
    const ingredients = [
      makeIngredient(1, "2 cups flour"),
      makeIngredient(2, "1 cup sugar"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(2);
  });

  test("combines items with no unit", () => {
    const ingredients = [
      makeIngredient(1, "2 eggs"),
      makeIngredient(2, "3 eggs"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("5 eggs");
    expect(result[0].ids).toEqual([1, 2]);
  });

  test("handles incompatible units with + notation", () => {
    const ingredients = [
      makeIngredient(1, "3 cloves garlic"),
      makeIngredient(2, "1 tsp garlic"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain("+");
    expect(result[0].ids).toEqual([1, 2]);
  });

  test("matches ingredients with different descriptors", () => {
    const ingredients = [
      makeIngredient(1, "4 cloves garlic, minced"),
      makeIngredient(2, "2 cloves garlic, sliced"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain("6");
    expect(result[0].name).toContain("clove");
    expect(result[0].ids).toEqual([1, 2]);
  });

  test("preserves location from first ingredient", () => {
    const ingredients = [
      makeIngredient(1, "1 cup flour", "baking"),
      makeIngredient(2, "2 cups flour", "baking"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result[0].location).toBe("baking");
  });

  test("handles no-quantity ingredients", () => {
    const ingredients = [
      makeIngredient(1, "salt and pepper to taste"),
      makeIngredient(2, "salt and pepper to taste"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("salt and pepper to taste");
  });

  test("handles empty list", () => {
    const result = consolidateIngredients([]);
    expect(result).toEqual([]);
  });

  test("handles null names gracefully", () => {
    const ingredients = [
      { id: 1, ingredientId: null, checked: false, name: null, location: null },
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
  });

  test("matches variant names via suffix (extra-virgin olive oil + olive oil)", () => {
    const ingredients = [
      makeIngredient(1, "3 tbsp extra-virgin olive oil", "baking"),
      makeIngredient(2, "1/4 cup olive oil", "baking"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].ids).toEqual([1, 2]);
    expect(result[0].name).toContain("olive oil");
  });

  test("matches fresh basil with basil", () => {
    const ingredients = [
      makeIngredient(1, "1/4 cup fresh basil"),
      makeIngredient(2, "2 tbsp basil"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(1);
    expect(result[0].ids).toEqual([1, 2]);
  });

  test("multiple groups consolidate independently", () => {
    const ingredients = [
      makeIngredient(1, "2 cups flour"),
      makeIngredient(2, "1 cup sugar"),
      makeIngredient(3, "1 cup flour"),
      makeIngredient(4, "1/2 cup sugar"),
    ];
    const result = consolidateIngredients(ingredients);
    expect(result).toHaveLength(2);

    const flour = result.find((r) => r.name.includes("flour"));
    const sugar = result.find((r) => r.name.includes("sugar"));

    expect(flour?.ids).toEqual([1, 3]);
    expect(flour?.name).toContain("3");

    expect(sugar?.ids).toEqual([2, 4]);
    expect(sugar?.name).toContain("1 1/2");
  });
});
