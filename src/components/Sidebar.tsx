"use client";

import Link from "next/link";
import {
  Home,
  Bookmark,
  Code2,
  FileText,
  BookOpen,
  TrendingUp,
  Info,
  Sparkles,
  Flame,
} from "lucide-react";
import CreatorCard from "@/components/CreatorCard";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/practice", label: "Practice", icon: Code2 },
  { href: "/resources", label: "Resources", icon: FileText },
  {
    href: "https://roadmap.sh/machine-learning",
    label: "Roadmap",
    icon: BookOpen,
    external: true,
  },
];

type SidebarProps = {
  active: string;
};

export default function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-gray-100 bg-white px-4 py-6">
      <div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-2 mb-8">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold text-lg">
            M
          </span>
          <span className="text-[15px] font-semibold text-gray-900">
            ML Pathway
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon, external }) => {
            const isActive = label === active;
            const linkClass = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-brand/10 text-brand font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`;

            if (external) {
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Icon size={18} strokeWidth={2} />
                  {label}
                </a>
              );
            }

            return (
              <Link key={label} href={href} className={linkClass}>
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            );
          })}

          <div className="my-3 h-px bg-gray-100" />

          <Link
            href="/about"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active === "About"
                ? "bg-brand/10 text-brand font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <Info size={18} strokeWidth={2} />
            About
          </Link>
        </nav>
      </div>

      {/* Bottom: creator contact card */}
      <div className="flex flex-col gap-3 flex-grow justify-end">
        <CreatorCard />
      </div>
    </aside>
  );
}
