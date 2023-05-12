import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  let sessionUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user");

  console.log(user, sessionUser.id);

  followUser(sessionUser.id, user);

  return NextResponse.json(sessionUser);
}

async function followUser(currentUserId, userIdToFollow) {
  try {
    // Check if the current user exists
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });
    if (!currentUser) {
      throw new Error(`User with ID ${currentUserId} not found.`);
    }

    // Check if the user to follow exists
    const userToFollow = await prisma.user.findUnique({
      where: { id: userIdToFollow },
    });
    if (!userToFollow) {
      throw new Error(`User with ID ${userIdToFollow} not found.`);
    }

    // Create a new entry in the Follow table
    const follow = await prisma.follow.create({
      data: {
        follower: { connect: { id: currentUserId } },
        following: { connect: { id: userIdToFollow } },
      },
    });

    console.log(`User ${currentUserId} started following ${userIdToFollow}.`);
    console.log(follow);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
