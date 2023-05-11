import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const ServerProtectedPage = async () => {
  const session = await getServerSession(authOptions);

  const prismaUser = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  });

  if (!session) {
    redirect("/api/auth/signin?callbacakUrl=/serverPage");
  }

  return (
    <div>
      <h1>Server Protected Page</h1>
      {/* formatted pre tag of the session.user object */}
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <pre>{JSON.stringify(prismaUser, null, 2)}</pre>
    </div>
  );
};

export default ServerProtectedPage;
