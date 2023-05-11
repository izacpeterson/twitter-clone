import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  let session = await getServerSession(authOptions);

  const body = await request.json();
  console.log(body);
  let prismaUser = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  });

  if (prismaUser) {
    let prismaPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: { connect: { id: prismaUser.id } },
      },
    });
  }
}
