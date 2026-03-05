import parseIngredient from "@/utils/parseIngredient";

describe("parseIngredient", () => {
  describe("basic quantities and units", () => {
    test("whole number with unit", () => {
      const result = parseIngredient("2 cups flour");
      expect(result.quantity).toBe(2);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("flour");
    });

    test("decimal quantity", () => {
      const result = parseIngredient("1.5 cups sugar");
      expect(result.quantity).toBe(1.5);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("sugar");
    });

    test("fraction quantity", () => {
      const result = parseIngredient("1/2 cup olive oil");
      expect(result.quantity).toBe(0.5);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("olive oil");
    });

    test("mixed number (whole + fraction)", () => {
      const result = parseIngredient("1 1/2 cups chicken broth");
      expect(result.quantity).toBe(1.5);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("chicken broth");
    });

    test("unicode fraction", () => {
      const result = parseIngredient("\u00BD cup butter");
      expect(result.quantity).toBe(0.5);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("butter");
    });

    test("whole number with unicode fraction", () => {
      const result = parseIngredient("1\u00BD cups milk");
      expect(result.quantity).toBe(1.5);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("milk");
    });
  });

  describe("unit normalization", () => {
    test("tablespoons -> tbsp", () => {
      const result = parseIngredient("2 tablespoons olive oil");
      expect(result.unit).toBe("tbsp");
    });

    test("tsp. with period", () => {
      const result = parseIngredient("1 tsp. salt");
      expect(result.unit).toBe("tsp");
    });

    test("ounces -> oz", () => {
      const result = parseIngredient("8 ounces pasta");
      expect(result.unit).toBe("oz");
    });

    test("lbs -> lb", () => {
      const result = parseIngredient("2 lbs chicken thighs");
      expect(result.unit).toBe("lb");
    });

    test("cloves", () => {
      const result = parseIngredient("3 cloves garlic");
      expect(result.quantity).toBe(3);
      expect(result.unit).toBe("clove");
      expect(result.item).toBe("garlic");
    });

    test("cans", () => {
      const result = parseIngredient("2 cans tomatoes");
      expect(result.quantity).toBe(2);
      expect(result.unit).toBe("can");
      expect(result.item).toBe("tomatoes");
    });
  });

  describe("no unit", () => {
    test("quantity with no unit", () => {
      const result = parseIngredient("4 eggs");
      expect(result.quantity).toBe(4);
      expect(result.unit).toBeNull();
      expect(result.item).toBe("eggs");
    });

    test("no quantity or unit", () => {
      const result = parseIngredient("salt and pepper to taste");
      expect(result.quantity).toBeNull();
      expect(result.unit).toBeNull();
      expect(result.item).toBe("salt and pepper to taste");
    });
  });

  describe("parenthetical patterns", () => {
    test("parenthetical size before unit", () => {
      const result = parseIngredient("1 (14-ounce) can diced tomatoes");
      expect(result.quantity).toBe(1);
      expect(result.unit).toBe("can");
      expect(result.item).toBe("(14-ounce) diced tomatoes");
    });

    test("parenthetical without following unit", () => {
      const result = parseIngredient("2 (about 1 lb) sweet potatoes");
      expect(result.quantity).toBe(2);
      expect(result.unit).toBeNull();
      expect(result.item).toBe("(about 1 lb) sweet potatoes");
    });
  });

  describe("real-world recipe ingredients", () => {
    test("kosher salt", () => {
      const result = parseIngredient("1 teaspoon kosher salt");
      expect(result.quantity).toBe(1);
      expect(result.unit).toBe("tsp");
      expect(result.item).toBe("kosher salt");
    });

    test("black pepper", () => {
      const result = parseIngredient("1/4 teaspoon black pepper");
      expect(result.quantity).toBe(0.25);
      expect(result.unit).toBe("tsp");
      expect(result.item).toBe("black pepper");
    });

    test("garlic with descriptor", () => {
      const result = parseIngredient("4 cloves garlic, minced");
      expect(result.quantity).toBe(4);
      expect(result.unit).toBe("clove");
      expect(result.item).toBe("garlic, minced");
    });

    test("onion with size", () => {
      const result = parseIngredient("1 large onion, diced");
      expect(result.quantity).toBe(1);
      expect(result.unit).toBe("large");
      expect(result.item).toBe("onion, diced");
    });

    test("preserves original string", () => {
      const original = "2 cups All-Purpose Flour";
      const result = parseIngredient(original);
      expect(result.original).toBe(original);
    });

    test("extra whitespace", () => {
      const result = parseIngredient("  2   cups   flour  ");
      expect(result.quantity).toBe(2);
      expect(result.unit).toBe("cup");
      expect(result.item).toBe("flour");
    });
  });

  describe("edge cases", () => {
    test("empty string", () => {
      const result = parseIngredient("");
      expect(result.quantity).toBeNull();
      expect(result.unit).toBeNull();
      expect(result.item).toBe("");
    });

    test("only a number", () => {
      const result = parseIngredient("3");
      expect(result.quantity).toBe(3);
      expect(result.unit).toBeNull();
      expect(result.item).toBe("");
    });

    test("only a unit-like word without quantity", () => {
      const result = parseIngredient("cups of joy");
      expect(result.quantity).toBeNull();
      expect(result.unit).toBeNull();
      expect(result.item).toBe("cups of joy");
    });
  });
});
