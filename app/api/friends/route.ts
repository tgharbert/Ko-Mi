import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/app/api/_base";

// GET all friends
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const friendsA = await prisma.friend.findMany({
      where: { friendAId: user.id, status: "ACCEPTED" },
      include: { friendB: true },
    });

    const friendsB = await prisma.friend.findMany({
      where: { friendBId: user.id, status: "ACCEPTED" },
      include: { friendA: true },
    });

    const friends = [
      ...friendsA.map((f) => f.friendB),
      ...friendsB.map((f) => f.friendA),
    ];

    return NextResponse.json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    return NextResponse.json(
      { error: "Failed to fetch friends" },
      { status: 500 }
    );
  }
}

// POST - Send friend request
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { friendId } = body;

    if (!friendId) {
      return NextResponse.json(
        { error: "Friend ID is required" },
        { status: 400 }
      );
    }

    // Check if friendship already exists
    const existing = await prisma.friend.findFirst({
      where: {
        OR: [
          { friendAId: user.id, friendBId: friendId },
          { friendAId: friendId, friendBId: user.id },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Friendship already exists" },
        { status: 400 }
      );
    }

    const friendship = await prisma.friend.create({
      data: {
        friendAId: user.id,
        friendBId: friendId,
        status: "PENDING",
      },
    });

    return NextResponse.json(friendship);
  } catch (error) {
    console.error("Error sending friend request:", error);
    return NextResponse.json(
      { error: "Failed to send friend request" },
      { status: 500 }
    );
  }
}
