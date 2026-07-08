import Link from "next/link";
import ContactLinks from "@/components/ContactLinks";
import { CREATOR } from "@/lib/creator-config";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-bold text-lg">
              M
            </span>
            <span className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
              ML Pathway
            </span>
          </Link>
          <span className="hidden sm:inline text-gray-200 dark:text-gray-700">|</span>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {CREATOR.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{CREATOR.title}</p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          {CREATOR.tagline && (
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs sm:text-right">
              {CREATOR.tagline}
            </p>
          )}
          <ContactLinks size={15} />
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-300 dark:text-gray-600">
        © {new Date().getFullYear()} ML Pathway. Built by {CREATOR.name}.
      </p>
    </footer>
  );
}
