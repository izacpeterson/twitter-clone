import { PrismaClient } from "@prisma/client";
import { FiMessageSquare, FiUserPlus } from "react-icons/fi";
import Link from "next/link";

import Post from "../../../components/Post";

const prisma = new PrismaClient();

export default async function UserPage({ params }) {
  let user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      posts: {
        include: {
          author: true,
        },
      },
      followers: {
        include: {
          follower: true, // Include follower user info
        },
      },
      following: {
        include: {
          following: true, // Include following user info
        },
      },
    },
  });

  console.log(user);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{user.name}</h1>
      {/* <p className="text-gray-500 mb-8">{user.email}</p> */}
      <div className="flex justify-evenly">
        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          <FiMessageSquare className="mr-2" />
          Message
        </button>
        <button className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded">
          <FiUserPlus className="mr-2" />
          Follow
        </button>
      </div>
      <div>
        <p className="text-gray-500 mt-8 mb-2">Followers</p>
        <ul className="flex">
          {user.followers.map((follower) => (
            <Link href={`/user/${follower.followerId}`} key={follower.id} className="mr-2">
              {follower.follower.name}
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-gray-500 mt-8 mb-2">Following</p>
        <ul className="flex">
          {user.following.map((following) => (
            <Link href={`/user/${following.followingId}`} key={following.id} className="mr-2">
              {following.following.name}
            </Link>
          ))}
        </ul>
      </div>

      <ul>
        {user.posts.map((post) => (
          <div key={post.id} className="mb-4">
            <Post post={post} />
          </div>
        ))}
      </ul>
    </div>
  );
}
