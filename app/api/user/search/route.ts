import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log("QUERY: ", query);
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query!,
          },
        },
        {
          email: {
            contains: query!,
          },
        },
      ],
    },
  });

  console.log("USERS: ", users);

  return NextResponse.json(users);
}
