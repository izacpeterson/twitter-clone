import "./globals.css";
import Provider from "./components/Provider";
import Link from "next/link";

export const metadata = {
  title: "Twutter",
  description: "A Twitter Clone built with Next.js and Prisma.",
};

import { FaUser, FaPlus, FaSearch } from "react-icons/fa";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <header className="bg-primary text-white p-2 flex items-center justify-between">
            <Link href="/">
              <h1 className="text-4xl">{metadata.title}</h1>
            </Link>
            <div className="flex">
              <Link href="/userSearch" className="p-2 text-xl">
                <FaSearch />
              </Link>
              <Link href="/account" className="p-2 text-xl">
                <FaUser />
              </Link>
            </div>
          </header>
          {children}
          <Link href="/newPost" className="fixed bottom-0 right-0">
            <div className="bg-primary text-white p-4 m-2 rounded-full shadow-lg">
              <FaPlus />
            </div>
          </Link>
        </Provider>
      </body>
    </html>
  );
}
