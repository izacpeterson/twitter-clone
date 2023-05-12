"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function userSearchPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/userSearch");
    },
  });
  //   let users = await fetch("http://localhost:3000/api/user/search?query=Izac");
  //   let usersJson = await users.json();
  //   console.log(usersJson);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  //   useEffect(() => {
  //     if (searchQuery.length > 0) {
  //       fetch(`http://localhost:3000/api/user/search?query=${searchQuery}`)
  //         .then((res) => res.json())
  //         .then((json) => setUsers(json));
  //     }
  //   }, [searchQuery]);

  async function searchUsers() {
    if (searchQuery.length > 0) {
      let userSearch = await fetch(`http://localhost:3000/api/user/search?query=${searchQuery}`);
      let usersJson = await userSearch.json();
      setUsers(usersJson);
    }
  }

  return (
    <div>
      <h1> User Search Page </h1>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 p-2 rounded-lg" />
      <button onClick={() => searchUsers()}>Search</button>
      <div>
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <h3 className="text-lg text-gray-600 mb-2">By {user.email}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
