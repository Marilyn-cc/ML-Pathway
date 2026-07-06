import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Database,
  Brain,
  Share2,
  Rocket,
  Code2,
  ChevronRight,
  FileText,
  PenLine,
  Package,
  Lightbulb,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import HeroIllustration from "@/components/HeroIllustration";

const RESOURCES = [
  {
    type: "Tutorial",
    title: "Python for Data Science",
    icon: FileText,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    typeColor: "text-emerald-600",
  },
  {
    type: "Guide",
    title: "ML Roadmap 2024",
    icon: PenLine,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    typeColor: "text-blue-600",
  },
  {
    type: "Project",
    title: "House Price Prediction",
    icon: Package,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    typeColor: "text-rose-600",
  },
  {
    type: "Article",
    title: "What is Machine Learning?",
    icon: Lightbulb,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    typeColor: "text-amber-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFB]">
      <Sidebar active="Home" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar mode="search" />

        <main className="flex-1 px-6 lg:px-10 pb-12">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white px-8 py-12 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
              <div>
                <h1 className="text-4xl lg:text-[2.75rem] font-bold leading-tight text-gray-900">
                  Learn Machine Learning.
                  <br />
                  <span className="text-brand">Step by Step.</span>
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-500">
                  Simple explanations, hands-on practice, and real projects to
                  help you build ML skills from the ground up.
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <Link
                    href="/resources"
                    className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    Start Learning
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="https://roadmap.sh/machine-learning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    View Roadmap
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <HeroIllustration />
              </div>
            </div>
          </section>

          {/* lPractice by doing */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Practice By Doing
              </h2>
              <Link
                href="/practice"
                className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
              >
                View all exercises
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl bg-brand/[0.06] px-8 py-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Code2 size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Learn by coding.
                  </p>
                  <p className="text-sm text-gray-500">
                    Practice with interactive exercises and mini-projects.
                  </p>
                </div>
              </div>
              <Link
                href="/practice"
                className="flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
              >
                <Code2 size={16} />
                Start Practicing
              </Link>
            </div>
          </section>

          {/* Latest resources */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Latest Resources
              </h2>
              <Link
                href="/resources"
                className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
              >
                View all resources
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {RESOURCES.map(
                ({ type, title, icon: Icon, iconBg, iconColor, typeColor }) => (
                  <Link
                    href="/resources"
                    key={title}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
                      >
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${typeColor}`}>
                          {type}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {title}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                ),
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
