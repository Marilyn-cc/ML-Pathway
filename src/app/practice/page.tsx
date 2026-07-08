"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  Search,
  LayoutGrid,
  List,
  Bookmark,
  FileStack,
  Play,
  Layers,
  TreePine,
  Workflow,
  GitFork,
  SlidersHorizontal,
  Target,
  TrendingUp,
  BrainCircuit,
  Filter,
  Pickaxe,
  SeparatorVertical,
} from "lucide-react";
import GithubMark from "@/components/GithubMark";
import FilterDropdown from "@/components/FilterDropdown";
import { githubUrl, colabUrl } from "@/lib/notebooks-config";

// NOTE: the two "Advanced_dimensionality_reduction..." filenames and the
// "support_vector_machines..." filename were truncated in the GitHub file
// list screenshot. Double check these three against your repo — if a Start
// link 404s, this is the first place to look.
const NOTEBOOKS = [
  {
    title: "Advanced Dimensionality Reduction — Examples",
    description: "Worked examples of PCA, t-SNE, and other reduction techniques.",
    file: "Advanced_dimensionality_reduction_techniques_examples.ipynb",
    tags: [{ label: "Advanced", color: "rose" }, { label: "Dimensionality Reduction", color: "gray" }],
    icon: Layers,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Advanced Dimensionality Reduction — Exercises",
    description: "Practice exercises to apply dimensionality reduction yourself.",
    file: "Advanced_dimensionality_reduction_techniques_exercise.ipynb",
    tags: [{ label: "Advanced", color: "rose" }, { label: "Dimensionality Reduction", color: "gray" }],
    icon: Layers,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Decision Trees",
    description: "Build and interpret decision tree models from scratch.",
    file: "Decision_trees.ipynb",
    tags: [{ label: "Intermediate", color: "amber" }, { label: "Trees", color: "gray" }],
    icon: TreePine,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Ensemble Methods",
    description: "Combine multiple models with bagging and boosting.",
    file: "Ensemble_methods_exercise.ipynb",
    tags: [{ label: "Advanced", color: "rose" }, { label: "Ensemble", color: "gray" }],
    icon: Workflow,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Hierarchical Clustering",
    description: "Group data points into nested clusters step by step.",
    file: "Hierarchical_clustering_example.ipynb",
    tags: [{ label: "Intermediate", color: "amber" }, { label: "Clustering", color: "gray" }],
    icon: GitFork,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Hyperparameters & Model Validation",
    description: "Tune models properly and validate results with confidence.",
    file: "Hyperparameters_and_model_validation_examples.ipynb",
    tags: [{ label: "Intermediate", color: "amber" }, { label: "Model Validation", color: "gray" }],
    icon: SlidersHorizontal,
    iconBg: "bg-teal-50 dark:bg-teal-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    title: "KNN & Naive Bayes",
    description: "Two classic classifiers, explained and implemented.",
    file: "KNN_and_Naive_Bayes_examples.ipynb",
    tags: [{ label: "Beginner", color: "emerald" }, { label: "Classification", color: "gray" }],
    icon: Target,
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Least Squares Regression",
    description: "Fit a regression line the classic way, from the math up.",
    file: "Least_Squares_Regression_Examples.ipynb",
    tags: [{ label: "Beginner", color: "emerald" }, { label: "Regression", color: "gray" }],
    icon: TrendingUp,
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Neural Network Classifiers",
    description: "Train your first neural network classifier end to end.",
    file: "Neural_network_classifiers_examples.ipynb",
    tags: [{ label: "Advanced", color: "rose" }, { label: "Neural Networks", color: "gray" }],
    icon: BrainCircuit,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Regularisation: LASSO",
    description: "Shrink coefficients and select features with L1 penalties.",
    file: "Regularisation_LASSO_examples.ipynb",
    tags: [{ label: "Intermediate", color: "amber" }, { label: "Regularisation", color: "gray" }],
    icon: Filter,
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Regularisation: Ridge",
    description: "Control overfitting with L2 penalty regularisation.",
    file: "Regularisation_ridge_examples.ipynb",
    tags: [{ label: "Intermediate", color: "amber" }, { label: "Regularisation", color: "gray" }],
    icon: Filter,
    iconBg: "bg-orange-50 dark:bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Data Mining",
    description: "Core data mining workflows and pattern discovery.",
    file: "data_mining.ipynb",
    tags: [{ label: "Intermediate", color: "amber" }, { label: "Data Mining", color: "gray" }],
    icon: Pickaxe,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "SVM & Model Tuning",
    description: "Support vector machines plus practical tuning tips.",
    file: "support_vector_machines_and_model_tuning_example.ipynb",
    tags: [{ label: "Advanced", color: "rose" }, { label: "SVM", color: "gray" }],
    icon: SeparatorVertical,
    iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TOPICS = Array.from(
  new Set(
    NOTEBOOKS.flatMap((nb) =>
      nb.tags.filter((t) => !LEVELS.includes(t.label)).map((t) => t.label)
    )
  )
);
const LANGUAGES = ["Python"]; // every notebook is Python today — kept for future non-Python notebooks

const TAGS = [
  "Beginner",
  "Regression",
  "Clustering",
  "Classification",
  "Regularisation",
  "Neural Networks",
  "Ensemble",
  "Trees",
];
const TABS = ["All Notebooks", "Beginner", "Intermediate", "Advanced"];

// Derived from the filename convention: *_exercise(s).ipynb -> Exercise, else Example.
function getFormat(nb: (typeof NOTEBOOKS)[number]) {
  return /exercise/i.test(nb.file) ? "Exercise" : "Example";
}

const TAG_COLORS: Record<string, string> = {
  emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
  gray: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
};

function getLevel(nb: (typeof NOTEBOOKS)[number]) {
  return nb.tags.find((t) =>
    ["Beginner", "Intermediate", "Advanced"].includes(t.label)
  )?.label;
}

function matchesQuery(nb: (typeof NOTEBOOKS)[number], query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    nb.title.toLowerCase().includes(q) ||
    nb.description.toLowerCase().includes(q) ||
    nb.tags.some((t) => t.label.toLowerCase().includes(q))
  );
}

function PracticeContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Notebooks");
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [formatFilter, setFormatFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Pick up ?q= from the home page search redirect
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const levelValue = activeTab === "All Notebooks" ? null : activeTab;

  const filtered = useMemo(() => {
    return NOTEBOOKS.filter((nb) => {
      const level = getLevel(nb);
      const levelMatch = !levelValue || level === levelValue;
      const topicMatch =
        !topicFilter || nb.tags.some((t) => t.label === topicFilter);
      const formatMatch = !formatFilter || getFormat(nb) === formatFilter;
      const languageMatch = !languageFilter || languageFilter === "Python";
      return (
        levelMatch &&
        topicMatch &&
        formatMatch &&
        languageMatch &&
        matchesQuery(nb, query)
      );
    });
  }, [query, levelValue, topicFilter, formatFilter, languageFilter]);

  function clearFilters() {
    setQuery("");
    setActiveTab("All Notebooks");
    setTopicFilter(null);
    setFormatFilter(null);
    setLanguageFilter(null);
  }

  const hasActiveFilters =
    query || levelValue || topicFilter || formatFilter || languageFilter;

  return (
    <div className="flex min-h-screen bg-[#FAFAFB] dark:bg-gray-950">
      <Sidebar active="Practice" promo="practicing" />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          mode="breadcrumb"
          crumbs={[
            { label: "Practice", href: "/practice" },
            { label: "Notebooks" },
          ]}
          showProgressButton
        />

        <main className="flex-1 px-6 lg:px-10 pb-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Practice Notebooks
              </h1>
              <p className="text-[15px] text-gray-500 dark:text-gray-400">
                Learn by doing. Explore notebooks, solve problems, and build
                real skills.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 dark:bg-brand/20 text-brand">
                <FileStack size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Notebooks</p>
                <p className="text-2xl font-bold text-brand leading-tight">
                  {NOTEBOOKS.length}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Across all topics</p>
              </div>
            </div>
          </div>

          {/* Search + filters */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 mb-6">
            <div className="relative mb-4">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notebooks..."
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-11 pr-4 text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-brand/40 focus:ring-4 focus:ring-brand/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <FilterDropdown
                label="All Topics"
                allLabel="All Topics"
                options={TOPICS}
                value={topicFilter}
                onChange={setTopicFilter}
              />
              <FilterDropdown
                label="All Levels"
                allLabel="All Levels"
                options={LEVELS}
                value={levelValue}
                onChange={(v) => setActiveTab(v ?? "All Notebooks")}
              />
              <FilterDropdown
                label="All Types"
                allLabel="All Types"
                options={["Example", "Exercise"]}
                value={formatFilter}
                onChange={setFormatFilter}
              />
              <FilterDropdown
                label="All Languages"
                allLabel="All Languages"
                options={LANGUAGES}
                value={languageFilter}
                onChange={setLanguageFilter}
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
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand/30 hover:text-brand hover:bg-brand/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs + view controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-6 border-b border-gray-100 dark:border-gray-800 sm:border-none">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 sm:pb-0 text-sm font-medium ${
                    activeTab === tab
                      ? "text-brand"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute -bottom-[1px] sm:hidden left-0 right-0 h-0.5 bg-brand" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 p-1 w-fit">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-brand/10 dark:bg-brand/20 text-brand"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <LayoutGrid size={15} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-brand/10 dark:bg-brand/20 text-brand"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <List size={15} />
                List
              </button>
            </div>
          </div>

          {/* Notebook grid / list */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No notebooks match &quot;{query}&quot;. Try a different search
              or clear the filter.
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {filtered.map((nb) => (
                <div
                  key={nb.file}
                  className="flex flex-col rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${nb.iconBg} ${nb.iconColor}`}
                    >
                      <nb.icon size={19} />
                    </div>
                    <button
                      aria-label="Save notebook"
                      className="text-gray-300 dark:text-gray-600 hover:text-brand"
                    >
                      <Bookmark size={17} />
                    </button>
                  </div>

                  <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-1.5 leading-snug">
                    {nb.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 mb-4 flex-1">
                    {nb.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {nb.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${TAG_COLORS[tag.color]}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800">
                    <a
                      href={githubUrl(nb.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                      className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <GithubMark size={14} />
                      GitHub
                    </a>
                    <a
                      href={colabUrl(nb.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
                    >
                      <Play size={13} fill="currentColor" />
                      Start
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-50 dark:divide-gray-800 mb-8">
              {filtered.map((nb) => (
                <div
                  key={nb.file}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${nb.iconBg} ${nb.iconColor}`}
                  >
                    <nb.icon size={19} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                      {nb.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">
                      {nb.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {nb.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${TAG_COLORS[tag.color]}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <a
                      href={githubUrl(nb.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                      className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <GithubMark size={14} />
                      GitHub
                    </a>
                    <a
                      href={colabUrl(nb.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
                    >
                      <Play size={13} fill="currentColor" />
                      Start
                    </a>
                    <button
                      aria-label="Save notebook"
                      className="text-gray-300 dark:text-gray-600 hover:text-brand"
                    >
                      <Bookmark size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={null}>
      <PracticeContent />
    </Suspense>
  );
}
