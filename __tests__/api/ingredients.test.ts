import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";

jest.mock("../../utils/matchIngredientLocation", () => ({
  matchLocation: jest.fn().mockReturnValue("produce"),
}));

jest.mock("../../utils/ingredientMap", () => ({
  STORE_LOCATIONS: ["produce", "dairy", "meat", "other"],
}));

import { GET, POST, DELETE } from "@/app/api/ingredients/route";

const mockAuth = auth as jest.MockedFunction<typeof auth>;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options);
}

describe("GET /api/ingredients", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET(createRequest("/api/ingredients"));
    expect(res.status).toBe(401);
  });

  test("returns sorted ingredients for authenticated user", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.userIngredient.findMany as jest.Mock).mockResolvedValue([
      { id: 1, ingredientId: null, name: "tomato", checked: false },
    ]);
    (prisma.location.findMany as jest.Mock).mockResolvedValue([]);

    const res = await GET(createRequest("/api/ingredients"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

describe("POST /api/ingredients", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const req = createRequest("/api/ingredients", {
      method: "POST",
      body: JSON.stringify({ item: "tomato" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  test("creates single ingredient", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const created = { id: 1, name: "tomato", userId: "user-1", checked: false };
    (prisma.userIngredient.create as jest.Mock).mockResolvedValue(created);

    const req = createRequest("/api/ingredients", {
      method: "POST",
      body: JSON.stringify({ item: "tomato" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.name).toBe("tomato");
  });

  test("creates bulk ingredients", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.userIngredient.createMany as jest.Mock).mockResolvedValue({ count: 3 });

    const req = createRequest("/api/ingredients", {
      method: "POST",
      body: JSON.stringify({
        ingredients: [{ name: "flour" }, { name: "sugar" }, { name: "butter" }],
      }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.count).toBe(3);
  });

  test("returns 400 for invalid body", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const req = createRequest("/api/ingredients", {
      method: "POST",
      body: JSON.stringify({ invalid: true }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/ingredients", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await DELETE(createRequest("/api/ingredients?deleteAll=true"));
    expect(res.status).toBe(401);
  });

  test("deletes all ingredients when deleteAll=true", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.userIngredient.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });

    const res = await DELETE(createRequest("/api/ingredients?deleteAll=true"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.count).toBe(5);
  });

  test("deletes checked ingredients when deleteChecked=true", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.userIngredient.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });

    const res = await DELETE(
      createRequest("/api/ingredients?deleteChecked=true")
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.count).toBe(2);
  });

  test("returns 400 for invalid delete operation", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const res = await DELETE(createRequest("/api/ingredients"));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid delete operation");
  });
});
