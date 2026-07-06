import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ContactLinks from "@/components/ContactLinks";
import { CREATOR } from "@/lib/creator-config";
import { Heart, Zap, Compass, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const VALUES = [
  {
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Start in minutes, not weeks",
    description:
      "No setup marathons, no thirty-tab prerequisite lists. Open a notebook in Colab and you're already writing code.",
  },
  {
    icon: Compass,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "A clear next step, always",
    description:
      "Machine learning has a thousand directions to wander in. ML Pathway picks one path and tells you what comes next.",
  },
  {
    icon: Rocket,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Learn by doing, immediately",
    description:
      "Every concept is paired with a real, runnable notebook — because reading about gradient descent and running it yourself are not the same thing.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFB]">
      <Sidebar active="About" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar mode="breadcrumb" crumbs={[{ label: "About" }]} />

        <main className="flex-1 px-6 lg:px-10 pb-12">
          {/* Hero */}
          <section className="rounded-2xl border border-gray-100 bg-white px-8 py-12 lg:px-12 mb-10">
            <div className="flex items-center gap-2 mb-4 text-brand">
              <Heart size={18} fill="currentColor" />
              <span className="text-sm font-medium">Why I built this</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 max-w-2xl">
              I built ML Pathway for the person who just wants to{" "}
              <span className="text-brand">start.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-gray-500">
              I remember what it felt like to open my first machine learning
              tutorial: fifteen browser tabs, three conflicting opinions on
              which library to learn first, and a feeling that everyone else
              already knew something I didn&apos;t. It shouldn&apos;t be that
              hard to take the first step.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-500">
              That&apos;s the whole reason ML Pathway exists. I care about
              beginners specifically — not because the advanced stuff
              doesn&apos;t matter, but because the hardest part of learning
              machine learning was never the math. It was figuring out where to
              click first. So I built the thing I wish I&apos;d had: a straight
              line from &quot;I know nothing&quot; to &quot;I just trained my
              first model,&quot; with real notebooks you can run the moment you
              land on the page.
            </p>
          </section>

          {/* Values */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              What I optimize for
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VALUES.map(
                ({ icon: Icon, iconBg, iconColor, title, description }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-gray-100 bg-white p-5"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor} mb-3`}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">
                      {title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-gray-500">
                      {description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Personal note / creator */}
          <section className="rounded-2xl bg-brand/[0.06] px-8 py-10 lg:px-12 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white">
                  {CREATOR.name
                    .split("")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0]?.toUpperCase())
                    .join("")}
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {CREATOR.name}
                  </p>
                  <p className="text-sm text-gray-500">{CREATOR.title}</p>
                </div>
              </div>
              <ContactLinks size={16} />
            </div>
            {CREATOR.tagline && (
              <p className="mt-6 text-sm text-gray-500 max-w-xl">
                {CREATOR.tagline}
              </p>
            )}
          </section>

          {/* CTA */}
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-8 py-6">
            <div>
              <p className="font-semibold text-gray-900">
                Ready to get started?
              </p>
              <p className="text-sm text-gray-500">
                No prerequisites. Just pick step one and go.
              </p>
            </div>
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Start Learning
              <ArrowRight size={16} />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
