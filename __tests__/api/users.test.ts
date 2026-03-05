import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { GET } from "@/app/api/users/route";

const mockAuth = auth as jest.Mock;

function createRequest(url: string) {
  return new NextRequest(new URL(url, "http://localhost:3000"));
}

describe("GET /api/users", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET(createRequest("/api/users?search=test"));
    expect(res.status).toBe(401);
  });

  test("returns empty array when search is empty", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const res = await GET(createRequest("/api/users"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual([]);
  });

  test("returns matching users", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const mockUsers = [
      { id: "1", name: "Alice", email: "alice@example.com", image: null },
    ];
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const res = await GET(createRequest("/api/users?search=alice"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockUsers);
    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 10 })
    );
  });
});
