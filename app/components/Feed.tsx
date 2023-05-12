import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Post from "./Post";

const prisma = new PrismaClient();

export default async function Feed() {
  let feed = await prisma.post.findMany({
    // sort
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  console.log(feed);
  return (
    <div>
      {feed.map((post) => (
        <div key={post.id} className="">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
