"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col items-center">
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()} className="btn btn-primary">
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      Not signed in <br />
      <button onClick={() => signIn()} className="btn btn-primary">
        Sign in
      </button>
    </div>
  );
}
