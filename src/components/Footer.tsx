import Link from "next/link";
import ContactLinks from "@/components/ContactLinks";
import { CREATOR } from "@/lib/creator-config";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8 pb-6">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-bold text-lg">
            M
          </span>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            ML Pathway
          </span>
        </Link>

        {/* Tagline */}
        {CREATOR.tagline && (
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-sm mb-4">
            {CREATOR.tagline}
          </p>
        )}

        {/* Quick nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mb-5 text-sm">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact icons */}
        <ContactLinks size={16} className="mb-5" />

        {/* Divider */}
        <div className="h-px w-20 bg-gray-100 dark:bg-gray-800 mb-4" />

        {/* Creator + copyright */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {CREATOR.name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
          {CREATOR.title}
        </p>
        <p className="text-xs text-gray-300 dark:text-gray-600">
          © {new Date().getFullYear()} ML Pathway. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
