import { Mail, Globe } from "lucide-react";
import GithubMark from "@/components/GithubMark";
import LinkedinMark from "@/components/LinkedinMark";
import XMark from "@/components/XMark";
import { CREATOR } from "@/lib/creator-config";

type ContactLinksProps = {
  size?: number;
  className?: string;
};

export default function ContactLinks({
  size = 15,
  className = "",
}: ContactLinksProps) {
  const links = [
    CREATOR.email && {
      key: "email",
      href: `mailto:${CREATOR.email}`,
      label: "Email",
      Icon: Mail,
    },
    CREATOR.github && {
      key: "github",
      href: CREATOR.github,
      label: "GitHub",
      Icon: GithubMark,
    },
    CREATOR.linkedin && {
      key: "linkedin",
      href: CREATOR.linkedin,
      label: "LinkedIn",
      Icon: LinkedinMark,
    },
    CREATOR.x && {
      key: "x",
      href: CREATOR.x,
      label: "X",
      Icon: XMark,
    },
    CREATOR.website && {
      key: "website",
      href: CREATOR.website,
      label: "Website",
      Icon: Globe,
    },
  ].filter(Boolean) as {
    key: string;
    href: string;
    label: string;
    Icon: typeof Mail;
  }[];

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-brand/30 hover:text-brand hover:bg-brand/5 transition-colors"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
