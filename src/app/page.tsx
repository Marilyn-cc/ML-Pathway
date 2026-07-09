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
import Footer from "@/components/Footer";

const LEARNING_PATH = [
  {
    step: 1,
    title: "Foundations",
    description: "Math, Python, and core concepts you need",
    icon: BookOpen,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    progress: 0,
  },
  {
    step: 2,
    title: "Data Basics",
    description: "Work with data, visualize, and explore datasets",
    icon: Database,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    progress: 0,
  },
  {
    step: 3,
    title: "ML Fundamentals",
    description: "Learn algorithms and model building",
    icon: Brain,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    progress: 0,
  },
  {
    step: 4,
    title: "Advanced Topics",
    description: "Deep learning, NLP, and more",
    icon: Share2,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    progress: 0,
  },
  {
    step: 5,
    title: "Projects",
    description: "Build end-to-end ML projects",
    icon: Rocket,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
    progress: 0,
  },
];

const RESOURCES = [
  {
    type: "Tutorial",
    title: "Python for Data Science",
    icon: FileText,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    typeColor: "text-emerald-600",
  },
  {
    type: "Guide",
    title: "ML Roadmap 2024",
    icon: PenLine,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    typeColor: "text-blue-600",
  },
  {
    type: "Project",
    title: "House Price Prediction",
    icon: Package,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
    typeColor: "text-rose-600",
  },
  {
    type: "Article",
    title: "What is Machine Learning?",
    icon: Lightbulb,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    typeColor: "text-amber-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFB] dark:bg-gray-950">
      <Sidebar active="Home" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar mode="search" />

        <main className="flex-1 px-6 lg:px-10 pb-12">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-8 py-12 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
              <div>
                <h1 className="text-4xl lg:text-[2.75rem] font-bold leading-tight text-gray-900 dark:text-gray-50">
                  Learn Machine Learning.
                  <br />
                  <span className="text-brand">Step by Step.</span>
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
                  Simple explanations, hands-on practice, and real projects to
                  help you build ML skills from the ground up.
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <button className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark">
                    Start Learning
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="https://roadmap.sh/machine-learning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
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

          {/* Learning Path */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Learning Path
              </h2>
              <a
                href="https://roadmap.sh/machine-learning"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
              >
                View full roadmap
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LEARNING_PATH.map(
                ({
                  step,
                  title,
                  description,
                  icon: Icon,
                  iconBg,
                  iconColor,
                  progress,
                }) => (
                  <div
                    key={step}
                    className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor} mb-3`}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
                      {step}
                    </p>
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
                      {title}
                    </h3>
                    <p className="text-[13px] leading-snug text-gray-500 dark:text-gray-400 mb-4 min-h-[34px]">
                      {description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                      {progress}% complete
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${Math.max(progress, 4)}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Practice by doing */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl bg-brand/[0.06] dark:bg-brand/[0.12] px-8 py-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 dark:bg-brand/20 text-brand">
                  <Code2 size={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Learn by coding.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
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
                    className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all"
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
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {title}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-300 dark:text-gray-600"
                    />
                  </Link>
                ),
              )}
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}
