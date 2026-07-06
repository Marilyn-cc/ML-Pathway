"use client";
// resources/page.tsx
import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  Search,
  LayoutGrid,
  List,
  Bookmark,
  ExternalLink,
  ClipboardList,
  GraduationCap,
  Newspaper,
  Compass,
} from "lucide-react";
import FilterDropdown from "@/components/FilterDropdown";

type ResourceType = "Cheat Sheet" | "Research Paper" | "Blog";

const TYPE_META: Record<
  ResourceType,
  {
    icon: typeof ClipboardList;
    iconBg: string;
    iconColor: string;
    badge: string;
  }
> = {
  "Cheat Sheet": {
    icon: ClipboardList,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge: "text-emerald-600",
  },
  "Research Paper": {
    icon: GraduationCap,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    badge: "text-violet-600",
  },
  Blog: {
    icon: Newspaper,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badge: "text-blue-600",
  },
};

// `url` can be either a full external link (https://...) or a local file
// served from the /public folder (e.g. "/cheatsheets/my-file.pdf").
// For local files: drop the PDF/image into public/cheatsheets/ and reference
// it here as "/cheatsheets/<filename>" — no "public" prefix needed, Next.js
// serves everything under public/ from the site root.
const RESOURCES: {
  type: ResourceType;
  title: string;
  description: string;
  source: string;
  url: string;
  tags: string[];
}[] = [
  {
    type: "Cheat Sheet",
    title: "Matplotlib Cheat Sheet",
    description:
      "Plot anatomy, plotting routines, styling, and layout in one page.",
    source: "ML Pathway",
    url: "/cheatsheets/matplotlib-cheatsheet.pdf",
    tags: ["Matplotlib", "Visualization"],
  },
  {
    type: "Cheat Sheet",
    title: "Scikit-Learn Cheat Sheet",
    description:
      "Preprocessing, model fitting, evaluation, and tuning at a glance.",
    source: "ML Pathway",
    url: "/cheatsheets/scikit-learn-cheatsheet.pdf",
    tags: ["Scikit-learn", "Model Selection"],
  },
  {
    type: "Cheat Sheet",
    title: "Seaborn Cheat Sheet",
    description: "Statistical plots, axis grids, and styling with Seaborn.",
    source: "ML Pathway",
    url: "/cheatsheets/seaborn-cheatsheet.pdf",
    tags: ["Seaborn", "Visualization"],
  },
  {
    type: "Research Paper",
    title: "Attention Is All You Need",
    description: "The paper that introduced the Transformer architecture.",
    source: "arXiv",
    url: "https://arxiv.org/abs/1706.03762",
    tags: ["Transformers", "NLP"],
  },
  {
    type: "Research Paper",
    title: "Deep Residual Learning for Image Recognition",
    description:
      "Introduces ResNet and residual connections for very deep networks.",
    source: "arXiv",
    url: "https://arxiv.org/abs/1512.03385",
    tags: ["Deep Learning", "Computer Vision"],
  },
  {
    type: "Research Paper",
    title: "Adam: A Method for Stochastic Optimization",
    description:
      "The optimizer behind most modern deep learning training runs.",
    source: "arXiv",
    url: "https://arxiv.org/abs/1412.6980",
    tags: ["Optimization", "Deep Learning"],
  },
  {
    type: "Blog",
    title: "The Illustrated Transformer",
    description: "A visual, intuitive walkthrough of how Transformers work.",
    source: "Jay Alammar",
    url: "https://jalammar.github.io/illustrated-transformer/",
    tags: ["Transformers", "NLP"],
  },
  {
    type: "Blog",
    title: "A Recipe for Training Neural Networks",
    description:
      "Practical, hard-won advice for actually getting models to train.",
    source: "Andrej Karpathy",
    url: "http://karpathy.github.io/2019/04/25/recipe/",
    tags: ["Deep Learning", "Best Practices"],
  },
  {
    type: "Blog",
    title: "Distill.pub Archive",
    description:
      "Interactive, visual explanations of machine learning research.",
    source: "Distill",
    url: "https://distill.pub/",
    tags: ["Deep Learning", "Visualization"],
  },
  {
    type: "Cheat Sheet",
    title: "Hugging Face Cheat Sheet",
    description:
      "Working with pre-trained models and pipelines in Hugging Face.",
    source: "ML Pathway",
    url: "/cheatsheets/hugging-face.pdf",
    tags: ["Hugging Face", "NLP"],
  },
];

const FILTERS_TYPE_OPTIONS = ["Cheat Sheet", "Research Paper", "Blog"];
const TAGS = [
  "Matplotlib",
  "Scikit-learn",
  "Seaborn",
  "Transformers",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Hugging Face",
];
const TOPICS = Array.from(new Set(RESOURCES.flatMap((r) => r.tags))).sort();
const TABS = ["All Resources", "Cheat Sheets", "Research Papers", "Blogs"];
const TAB_TYPE: Record<string, ResourceType | null> = {
  "All Resources": null,
  "Cheat Sheets": "Cheat Sheet",
  "Research Papers": "Research Paper",
  Blogs: "Blog",
};
const TYPE_TAB: Record<ResourceType, string> = {
  "Cheat Sheet": "Cheat Sheets",
  "Research Paper": "Research Papers",
  Blog: "Blogs",
};

function matchesQuery(r: (typeof RESOURCES)[number], query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.source.toLowerCase().includes(q) ||
    r.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Resources");
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const wantedType = TAB_TYPE[activeTab];
    return RESOURCES.filter((r) => {
      const tabMatch = !wantedType || r.type === wantedType;
      const topicMatch = !topicFilter || r.tags.includes(topicFilter);
      return tabMatch && topicMatch && matchesQuery(r, query);
    });
  }, [query, activeTab, topicFilter]);

  function clearFilters() {
    setQuery("");
    setActiveTab("All Resources");
    setTopicFilter(null);
  }

  const hasActiveFilters =
    query || activeTab !== "All Resources" || topicFilter;

  return (
    <div className="flex min-h-screen bg-[#FAFAFB]">
      <Sidebar active="Resources" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          mode="breadcrumb"
          crumbs={[{ label: "Resources" }]}
          showProgressButton
        />

        <main className="flex-1 px-6 lg:px-10 pb-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resources
              </h1>
              <p className="text-[15px] text-gray-500">
                Cheat sheets, research papers, and blogs to deepen your ML
                knowledge.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Compass size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Resources</p>
                <p className="text-2xl font-bold text-brand leading-tight">
                  {RESOURCES.length}
                </p>
                <p className="text-xs text-gray-400">Across all topics</p>
              </div>
            </div>
          </div>

          {/* Search + filters */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 mb-6">
            <div className="relative mb-4">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-brand/40 focus:ring-4 focus:ring-brand/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <FilterDropdown
                label="All Types"
                allLabel="All Types"
                options={FILTERS_TYPE_OPTIONS}
                value={TAB_TYPE[activeTab]}
                onChange={(v) =>
                  setActiveTab(
                    v ? TYPE_TAB[v as ResourceType] : "All Resources",
                  )
                }
              />
              <FilterDropdown
                label="All Topics"
                allLabel="All Topics"
                options={TOPICS}
                value={topicFilter}
                onChange={setTopicFilter}
              />
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-brand hover:text-brand-dark"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-400 mr-1">Popular tags:</span>
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    query.toLowerCase() === tag.toLowerCase()
                      ? "border-brand/30 bg-brand/5 text-brand"
                      : "border-gray-200 text-gray-600 hover:border-brand/30 hover:text-brand hover:bg-brand/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs + view controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-6 border-b border-gray-100 sm:border-none">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 sm:pb-0 text-sm font-medium ${
                    activeTab === tab
                      ? "text-brand"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute -bottom-[1px] sm:hidden left-0 right-0 h-0.5 bg-brand" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1 w-fit">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-brand/10 text-brand"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid size={15} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-brand/10 text-brand"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <List size={15} />
                List
              </button>
            </div>
          </div>

          {/* Resource grid / list */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white p-12 text-center text-sm text-gray-500">
              No resources match &quot;{query}&quot;. Try a different search or
              clear the filter.
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filtered.map((resource) => {
                const meta = TYPE_META[resource.type];
                return (
                  <div
                    key={resource.title}
                    className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${meta.iconBg} ${meta.iconColor}`}
                      >
                        <meta.icon size={19} />
                      </div>
                      <button
                        aria-label="Save resource"
                        className="text-gray-300 hover:text-brand"
                      >
                        <Bookmark size={17} />
                      </button>
                    </div>

                    <p className={`text-xs font-medium mb-1 ${meta.badge}`}>
                      {resource.type}
                    </p>
                    <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5 leading-snug">
                      {resource.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-gray-500 mb-4 flex-1">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">
                        {resource.source}
                      </span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
                      >
                        Read
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col rounded-xl border border-gray-100 bg-white divide-y divide-gray-50 mb-8">
              {filtered.map((resource) => {
                const meta = TYPE_META[resource.type];
                return (
                  <div
                    key={resource.title}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${meta.iconBg} ${meta.iconColor}`}
                    >
                      <meta.icon size={19} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${meta.badge}`}>
                        {resource.type}
                      </p>
                      <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
                        {resource.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 truncate">
                        {resource.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 shrink-0">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-gray-400">
                        {resource.source}
                      </span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
                      >
                        Read
                        <ExternalLink size={13} />
                      </a>
                      <button
                        aria-label="Save resource"
                        className="text-gray-300 hover:text-brand"
                      >
                        <Bookmark size={17} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
