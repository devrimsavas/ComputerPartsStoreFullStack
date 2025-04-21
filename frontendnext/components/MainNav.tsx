"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutLink from "@components/LogoutLink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Our Products" },
  { href: "/cart", label: "My Cart" },
];

interface User {
  username: string;
  role: string;
}

const MainNav = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // fetch session from your backend, adapt as needed
    const getSession = async () => {
      try {
        const res = await fetch("http://localhost:3001/session", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      }
    };

    getSession();
  }, []);
  return (
    <div className="flex justify-between items-center w-full">
      <nav className="flex gap-6 text-lg font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition duration-300 hover:text-blue-600 ${
              pathname === link.href
                ? "text-blue-800 underline"
                : "text-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {user?.role === "admin" && (
          <Link
            href="/adminpanel"
            className={`transition duration-300 hover:text-red-600 ${
              pathname === "/adminpanel"
                ? "text-red-800 underline"
                : "text-red-600"
            }`}
          >
            Admin Panel
          </Link>
        )}
      </nav>

      {/* Right Side: Logged-in or not */}
      <div className="text-sm text-gray-700 ml-6 flex items-center gap-4">
        {user ? (
          <>
            Hello, <span className="font-semibold">{user.username}</span> |{" "}
            <LogoutLink />
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;
