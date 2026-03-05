import { matchLocation, matchLocations } from "@/utils/matchIngredientLocation";

describe("matchLocation", () => {
  test("matches produce items", () => {
    expect(matchLocation("tomato")).toBe("produce");
  });

  test("matches dairy items", () => {
    expect(matchLocation("butter")).toBe("dairy");
  });

  test("matches meat items", () => {
    expect(matchLocation("chicken thighs")).toBe("meat");
  });

  test("matches spice items", () => {
    expect(matchLocation("cumin")).toBe("spice");
  });

  test("matches pasta items", () => {
    expect(matchLocation("spaghetti")).toBe("pasta");
  });

  test("returns 'other' for unknown items", () => {
    expect(matchLocation("xylophone strings")).toBe("other");
  });

  test("skips measurement words and matches actual ingredient", () => {
    expect(matchLocation("2 cups chopped onion")).toBe("produce");
  });

  test("handles parenthetical content", () => {
    expect(matchLocation("(14-ounce) diced tomatoes")).toBe("produce");
  });

  test("is case insensitive", () => {
    expect(matchLocation("GARLIC")).toBe("produce");
  });

  test("matches compound phrases like soy sauce", () => {
    expect(matchLocation("soy sauce")).toBe("asian");
  });

  test("matches compound phrases like olive oil", () => {
    expect(matchLocation("olive oil")).toBe("baking");
  });
});

describe("matchLocations", () => {
  test("returns location data for each ingredient", () => {
    const ingredients: IngredientData[] = [
      { id: 1, name: "tomato", types: [], locationId: null, recipeId: 1 },
      { id: 2, name: "butter", types: [], locationId: null, recipeId: 1 },
    ];

    const result = matchLocations(ingredients);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      ingredientId: 1,
      store: "produce",
      home: "",
    });
    expect(result[1]).toEqual({
      ingredientId: 2,
      store: "dairy",
      home: "",
    });
  });

  test("returns empty array for empty input", () => {
    expect(matchLocations([])).toEqual([]);
  });
});
