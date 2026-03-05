import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { PATCH, DELETE } from "@/app/api/friends/[id]/route";

const mockAuth = auth as jest.MockedFunction<typeof auth>;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options);
}

function createParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("PATCH /api/friends/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const req = createRequest("/api/friends/f-1", {
      method: "PATCH",
      body: JSON.stringify({ action: "accept" }),
    });
    const res = await PATCH(req, createParams("f-1"));
    expect(res.status).toBe(401);
  });

  test("accepts friend request", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const updated = { id: "f-1", status: "ACCEPTED" };
    (prisma.friend.update as jest.Mock).mockResolvedValue(updated);

    const req = createRequest("/api/friends/f-1", {
      method: "PATCH",
      body: JSON.stringify({ action: "accept" }),
    });
    const res = await PATCH(req, createParams("f-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("ACCEPTED");
  });

  test("rejects friend request by deleting", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.friend.delete as jest.Mock).mockResolvedValue({});

    const req = createRequest("/api/friends/f-1", {
      method: "PATCH",
      body: JSON.stringify({ action: "reject" }),
    });
    const res = await PATCH(req, createParams("f-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });

  test("returns 400 for invalid action", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const req = createRequest("/api/friends/f-1", {
      method: "PATCH",
      body: JSON.stringify({ action: "invalid" }),
    });
    const res = await PATCH(req, createParams("f-1"));
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/friends/[id]", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await DELETE(createRequest("/api/friends/f-1"), createParams("f-1"));
    expect(res.status).toBe(401);
  });

  test("deletes friend successfully", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.friend.delete as jest.Mock).mockResolvedValue({});

    const res = await DELETE(createRequest("/api/friends/f-1"), createParams("f-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
