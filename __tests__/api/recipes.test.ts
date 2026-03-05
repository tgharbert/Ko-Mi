import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";

// Mock scraper and parser - use relative paths since SWC resolves @/ aliases
jest.mock("../../utils/scraper", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../utils/parseRecipe", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import { GET, POST } from "@/app/api/recipes/route";
import getData from "@/utils/scraper";
import getRecipeObject from "@/utils/parseRecipe";

const mockAuth = auth as jest.Mock;
const mockGetData = getData as jest.Mock;
const mockGetRecipeObject = getRecipeObject as jest.Mock;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options as any);
}

describe("GET /api/recipes", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = createRequest("/api/recipes");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  test("returns 404 when user not found", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const req = createRequest("/api/recipes");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("User not found");
  });

  test("returns recipes for authenticated user", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
      email: "test@example.com",
    });

    const mockRecipes = [
      { id: 1, name: "Test Recipe", keywords: [], ingredients: [] },
    ];
    (prisma.recipe.findMany as jest.Mock).mockResolvedValue(mockRecipes);

    const req = createRequest("/api/recipes");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockRecipes);
  });

  test("passes query and category filters to prisma", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
    });
    (prisma.recipe.findMany as jest.Mock).mockResolvedValue([]);

    const req = createRequest("/api/recipes?query=pasta&category=name&page=2");
    await GET(req);

    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId: "user-1",
          name: { contains: "pasta", mode: "insensitive" },
        }),
        skip: 12,
        take: 12,
      })
    );
  });

  test("handles keyword category filter", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
    });
    (prisma.recipe.findMany as jest.Mock).mockResolvedValue([]);

    const req = createRequest("/api/recipes?query=italian&category=keyword");
    await GET(req);

    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          keywords: {
            some: { name: { contains: "italian", mode: "insensitive" } },
          },
        }),
      })
    );
  });
});

describe("POST /api/recipes", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = createRequest("/api/recipes", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com/recipe" }),
    });
    const res = await POST(req);

    expect(res.status).toBe(401);
  });

  test("returns 400 when URL is missing", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
    });

    const req = createRequest("/api/recipes", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("URL is required");
  });

  test("returns 400 when scraping fails", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
    });
    mockGetData.mockResolvedValue(null);

    const req = createRequest("/api/recipes", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com/recipe" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Failed to scrape recipe from URL");
  });

  test("creates recipe successfully", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user-1",
    });
    mockGetData.mockResolvedValue({ some: "data" });
    mockGetRecipeObject.mockReturnValue({
      url: "https://example.com/recipe",
      name: "Test Recipe",
      author: "Chef",
      description: "Delicious",
      instructions: ["Step 1"],
      image: "img.jpg",
      aggregateRating: 4.5,
      recipeYield: 4,
      totalTime: "PT30M",
      cookTime: "PT20M",
      prepTime: "PT10M",
      publisherName: "Test",
      publisherUrl: "https://example.com",
      publisherLogo: "logo.png",
      recipeIngredient: ["1 cup flour", "2 eggs"],
      category: [],
      keywords: [],
      id: 0,
    });

    const createdRecipe = { id: 1, name: "Test Recipe" };
    (prisma.recipe.create as jest.Mock).mockResolvedValue(createdRecipe);

    const req = createRequest("/api/recipes", {
      method: "POST",
      body: JSON.stringify({
        url: "https://example.com/recipe",
        keywords: ["easy"],
      }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(createdRecipe);
  });
});
