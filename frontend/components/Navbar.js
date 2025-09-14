"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "首頁" },
    { href: "/flights", label: "航班清單" },
    { href: "/stats", label: "統計" },
    { href: "/settings", label: "設定" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="text-lg font-bold">松山航班資訊</div>

          {/* 導覽連結 */}
          <div className="flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-gray-200 transition ${
                  pathname === link.href ? "font-bold underline" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
