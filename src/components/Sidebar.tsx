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
  { href: "/learn", label: "Learn", icon: Bookmark },
  { href: "/practice", label: "Practice", icon: Code2 },
  { href: "/resources", label: "Resources", icon: FileText },
  {
    href: "https://roadmap.sh/machine-learning",
    label: "Roadmap",
    icon: BookOpen,
    external: true,
  },
  { href: "/progress", label: "Progress", icon: TrendingUp },
];

type SidebarProps = {
  active: string;
  /** Which promo card to show at the bottom of the sidebar */
  promo?: "learning" | "practicing";
};

export default function Sidebar({ active, promo = "learning" }: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-6">
      <div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-2 mb-8">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold text-lg">
            M
          </span>
          <span className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
            ML Pathway
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon, external }) => {
            const isActive = label === active;
            const linkClass = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-brand/10 dark:bg-brand/20 text-brand font-medium"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-100"
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

          <div className="my-3 h-px bg-gray-100 dark:bg-gray-800" />

          <Link
            href="/about"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active === "About"
                ? "bg-brand/10 dark:bg-brand/20 text-brand font-medium"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-100"
            }`}
          >
            <Info size={18} strokeWidth={2} />
            About
          </Link>
        </nav>
      </div>

      {/* Bottom: promo card + creator contact card */}
      <div className="flex flex-col gap-3">
        {promo === "learning" ? (
          <div className="rounded-xl bg-brand/[0.06] dark:bg-brand/[0.12] p-4">
            <Sparkles size={18} className="text-brand mb-2" strokeWidth={2} />
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Focus on learning.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">We&apos;ll guide the way.</p>
          </div>
        ) : (
          <div className="rounded-xl bg-brand/[0.06] dark:bg-brand/[0.12] p-4">
            <Sparkles size={18} className="text-brand mb-2" strokeWidth={2} />
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Keep practicing!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Consistency builds real skills.
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              3 day streak <Flame size={14} className="text-orange-500" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div className="h-full w-2/5 rounded-full bg-brand" />
            </div>
          </div>
        )}

        <CreatorCard />
      </div>
    </aside>
  );
}
