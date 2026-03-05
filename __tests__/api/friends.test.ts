import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { GET, POST } from "@/app/api/friends/route";

const mockAuth = auth as jest.MockedFunction<typeof auth>;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options);
}

describe("GET /api/friends", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET(createRequest("/api/friends"));
    expect(res.status).toBe(401);
  });

  test("returns combined friends list from both directions", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const friendA = { name: "Alice", id: "a-1" };
    const friendB = { name: "Bob", id: "b-1" };

    (prisma.friend.findMany as jest.Mock)
      .mockResolvedValueOnce([{ friendB: friendA }])
      .mockResolvedValueOnce([{ friendA: friendB }]);

    const res = await GET(createRequest("/api/friends"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual([friendA, friendB]);
  });
});

describe("POST /api/friends", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const req = createRequest("/api/friends", {
      method: "POST",
      body: JSON.stringify({ friendId: "friend-1" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  test("returns 400 when friendId is missing", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });

    const req = createRequest("/api/friends", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Friend ID is required");
  });

  test("returns 400 when friendship already exists", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.friend.findFirst as jest.Mock).mockResolvedValue({ id: "existing" });

    const req = createRequest("/api/friends", {
      method: "POST",
      body: JSON.stringify({ friendId: "friend-1" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Friendship already exists");
  });

  test("creates friend request successfully", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
    (prisma.friend.findFirst as jest.Mock).mockResolvedValue(null);

    const friendship = {
      id: "f-1",
      friendAId: "user-1",
      friendBId: "friend-1",
      status: "PENDING",
    };
    (prisma.friend.create as jest.Mock).mockResolvedValue(friendship);

    const req = createRequest("/api/friends", {
      method: "POST",
      body: JSON.stringify({ friendId: "friend-1" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("PENDING");
  });
});
