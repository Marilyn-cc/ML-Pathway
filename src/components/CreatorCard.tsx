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
    <div className="rounded-xl border border-gray-100 p-4 py-10">
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
          {initials(CREATOR.name)}
        </div>
        <div className="text-center min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {CREATOR.name}
          </p>
          <p className="text-xs text-gray-400 truncate">{CREATOR.title}</p>
        </div>
      </div>
      <div className="mt-6">
        <ContactLinks size={14} />
      </div>
    </div>
  );
}
