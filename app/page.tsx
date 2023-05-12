import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

import LoginButton from "./components/LoginButton";

import NewPost from "./components/NewPost";
import Feed from "./components/Feed";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      {/* <Link href="/serverPage"> Protected Page </Link> */}
      {/* @ts-expect-error Server Component */}
      <Feed />
      {session ? (
        <div>{/* <NewPost /> */}</div>
      ) : (
        <div>
          {/* <h1> Please sign in to continue </h1>
          <LoginButton /> */}
        </div>
      )}
    </main>
  );
}
