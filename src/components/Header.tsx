"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/characters", label: "Characters" },
    { href: "/favorites", label: "Favorites" },
  ];

  return (
    <header className="w-full px-6 py-4 bg-white shadow sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-5xl mx-auto">
        <span className="text-xl font-bold text-blue-600">R&M Explorer</span>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "text-gray-700 hover:text-blue-600 transition font-medium",
                  pathname === link.href && "text-blue-600 font-semibold",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
