import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

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
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <h3 className="text-lg text-gray-600 mb-2">By {post.author.name}</h3>
          <p className="text-gray-800">{post.content}</p>
          <p className="text-xs pt-2 text-gray-400">{post.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
