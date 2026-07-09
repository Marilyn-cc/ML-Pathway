import ContactLinks from "@/components/ContactLinks";
import { CREATOR } from "@/lib/creator-config";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function CreatorCard() {
  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 dark:bg-brand/20 text-sm font-semibold text-brand">
          {initials(CREATOR.name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {CREATOR.name}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
            {CREATOR.title}
          </p>
        </div>
      </div>
      <ContactLinks size={14} />
    </div>
  );
}
