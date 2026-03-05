import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { GET, PUT, DELETE } from "@/app/api/recipes/[id]/route";

const mockAuth = auth as jest.Mock;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options as any);
}

function createParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("GET /api/recipes/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET(createRequest("/api/recipes/1"), createParams("1"));
    expect(res.status).toBe(401);
  });

  test("returns 404 when recipe not found", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await GET(createRequest("/api/recipes/999"), createParams("999"));
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("Recipe not found");
  });

  test("returns recipe when found", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    const mockRecipe = { id: 1, name: "Test Recipe", keywords: [], ingredients: [] };
    (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(mockRecipe);

    const res = await GET(createRequest("/api/recipes/1"), createParams("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockRecipe);
  });
});

describe("PUT /api/recipes/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const req = createRequest("/api/recipes/1", {
      method: "PUT",
      body: JSON.stringify({ name: "Updated" }),
    });
    const res = await PUT(req, createParams("1"));
    expect(res.status).toBe(401);
  });

  test("updates recipe successfully", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    const updated = { id: 1, name: "Updated Recipe" };
    (prisma.recipe.update as jest.Mock).mockResolvedValue(updated);

    const req = createRequest("/api/recipes/1", {
      method: "PUT",
      body: JSON.stringify({ name: "Updated Recipe" }),
    });
    const res = await PUT(req, createParams("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.name).toBe("Updated Recipe");
  });
});

describe("DELETE /api/recipes/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await DELETE(createRequest("/api/recipes/1"), createParams("1"));
    expect(res.status).toBe(401);
  });

  test("returns 403 when user does not own recipe", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.recipe.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      userId: "other-user",
    });

    const res = await DELETE(createRequest("/api/recipes/1"), createParams("1"));
    const data = await res.json();

    expect(res.status).toBe(403);
    expect(data.error).toBe("Forbidden");
  });

  test("deletes recipe when user owns it", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.recipe.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      userId: "user-1",
    });
    (prisma.recipe.delete as jest.Mock).mockResolvedValue({});

    const res = await DELETE(createRequest("/api/recipes/1"), createParams("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
