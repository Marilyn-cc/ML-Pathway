"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sun, TrendingUp, ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type TopBarProps = {
  mode: "search" | "breadcrumb";
  crumbs?: Crumb[];
  showProgressButton?: boolean;
};

export default function TopBar({
  mode,
  crumbs = [],
  showProgressButton = false,
}: TopBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/practice?q=${encodeURIComponent(q)}` : "/practice");
  }

  return (
    <div className="flex items-center gap-4 px-6 lg:px-10 py-5">
      <div className="flex-1">
        {mode === "search" ? (
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, lessons, or resources..."
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-shadow focus:border-brand/40 focus:ring-4 focus:ring-brand/10"
            />
          </form>
        ) : (
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            {crumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gray-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-900">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {showProgressButton && (
          <button className="hidden sm:flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <TrendingUp size={16} />
            My Progress
          </button>
        )}
        <button
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <Sun size={16} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          M
        </div>
      </div>
    </div>
  );
}
