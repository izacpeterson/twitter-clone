import LoginButton from "@/app/components/LoginButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function name() {
  const session = await getServerSession(authOptions);

  const prismaUser = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
    include: { followers: true, following: true },
  });

  return (
    <div>
      <h1>My Account</h1>
      <div>
        <pre>{JSON.stringify(prismaUser, null, 2)}</pre>
      </div>
      <LoginButton />
    </div>
  );
}
