import { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";
import { GET, POST } from "@/app/api/reported-urls/route";

const mockAuth = auth as jest.Mock;

function createRequest(url: string, options?: RequestInit) {
  return new NextRequest(new URL(url, "http://localhost:3000"), options as any);
}

describe("POST /api/reported-urls", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const req = createRequest("/api/reported-urls", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  test("returns 400 when URL is missing", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const req = createRequest("/api/reported-urls", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 200 if URL already reported", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const existing = { id: 1, url: "https://example.com", addressed: false };
    (prisma.reportedURL.findFirst as jest.Mock).mockResolvedValue(existing);

    const req = createRequest("/api/reported-urls", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe("URL already reported");
  });

  test("creates new reported URL with 201 status", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.reportedURL.findFirst as jest.Mock).mockResolvedValue(null);

    const created = { id: 1, url: "https://new-url.com", addressed: false };
    (prisma.reportedURL.create as jest.Mock).mockResolvedValue(created);

    const req = createRequest("/api/reported-urls", {
      method: "POST",
      body: JSON.stringify({ url: "https://new-url.com" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.message).toBe("URL reported successfully");
  });
});

describe("GET /api/reported-urls", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await GET(createRequest("/api/reported-urls"));
    expect(res.status).toBe(401);
  });

  test("returns all reported URLs", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });

    const urls = [{ id: 1, url: "https://example.com", addressed: false }];
    (prisma.reportedURL.findMany as jest.Mock).mockResolvedValue(urls);

    const res = await GET(createRequest("/api/reported-urls"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(urls);
  });

  test("filters by addressed param", async () => {
    mockAuth.mockResolvedValue({
      user: { email: "test@example.com" },
      expires: "",
    });
    (prisma.reportedURL.findMany as jest.Mock).mockResolvedValue([]);

    await GET(createRequest("/api/reported-urls?addressed=false"));

    expect(prisma.reportedURL.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { addressed: false },
      })
    );
  });
});
