"use client";

import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = "/", className = "" }: LogoProps) {
  return (
    <Link href={href} className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
          <span className="text-white text-lg font-bold">🏎️</span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          VuaXeMoHinh
        </span>
        <span className="text-xs text-gray-500 font-medium">
          Model Cars Collection
        </span>
      </div>
    </Link>
  );
}
