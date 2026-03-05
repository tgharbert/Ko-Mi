import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { PATCH, DELETE } from "@/app/api/ingredients/[id]/route";

const mockAuth = auth as jest.MockedFunction<typeof auth>;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options);
}

function createParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("PATCH /api/ingredients/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const req = createRequest("/api/ingredients/1", {
      method: "PATCH",
      body: JSON.stringify({ checked: true }),
    });
    const res = await PATCH(req, createParams("1"));
    expect(res.status).toBe(401);
  });

  test("returns 400 when checked is not boolean", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const req = createRequest("/api/ingredients/1", {
      method: "PATCH",
      body: JSON.stringify({ checked: "yes" }),
    });
    const res = await PATCH(req, createParams("1"));
    expect(res.status).toBe(400);
  });

  test("updates ingredient checked status", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const updated = { id: 1, name: "tomato", checked: true };
    (prisma.userIngredient.update as jest.Mock).mockResolvedValue(updated);

    const req = createRequest("/api/ingredients/1", {
      method: "PATCH",
      body: JSON.stringify({ checked: true }),
    });
    const res = await PATCH(req, createParams("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.checked).toBe(true);
  });
});

describe("DELETE /api/ingredients/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await DELETE(createRequest("/api/ingredients/1"), createParams("1"));
    expect(res.status).toBe(401);
  });

  test("deletes ingredient successfully", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.userIngredient.delete as jest.Mock).mockResolvedValue({});

    const res = await DELETE(createRequest("/api/ingredients/1"), createParams("1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
