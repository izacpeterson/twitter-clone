"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function NewPost() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/newPost");
    },
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = { title, content };

    await fetch("/api/posts/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    location.replace("/");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title
          </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-sm w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-bold mb-1">
            Content
          </label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-sm w-full" />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      <button type="submit" className="btn bg-red-500 text-white mt-4" onClick={() => location.replace("/")}>
        Cancel
      </button>
    </div>
  );
}
