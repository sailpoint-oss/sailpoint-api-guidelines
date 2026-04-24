"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Rule = {
  id: string;
  title: string;
  level: string;
  category: string;
  categorySlug: string;
  url: string;
};

type RulesData = { rules: Rule[] };

const levelConfig = {
  MUST: {
    label: "MUST",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  SHOULD: {
    label: "SHOULD",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  MAY: {
    label: "MAY",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
} as const;

export function RulesIndex() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const rulesIndexURL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/rules.json`;

  useEffect(() => {
    fetch(rulesIndexURL)
      .then((r) => r.json())
      .then((data: RulesData) => {
        setRules(data.rules);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [rulesIndexURL]);

  const categories = useMemo(
    () => [...new Set(rules.map((r) => r.category))].sort(),
    [rules],
  );

  const filtered = useMemo(() => {
    return rules.filter((r) => {
      if (levelFilter !== "all" && r.level !== levelFilter) return false;
      if (categoryFilter !== "all" && r.category !== categoryFilter)
        return false;
      if (
        search &&
        !`${r.id} ${r.title}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [rules, search, levelFilter, categoryFilter]);

  const groupedByCategory = useMemo(() => {
    const groups = new Map<string, Rule[]>();
    for (const rule of filtered) {
      const existing = groups.get(rule.category) ?? [];
      existing.push(rule);
      groups.set(rule.category, existing);
    }
    return groups;
  }, [filtered]);

  if (loading) {
    return (
      <div className="py-8 text-center text-fd-muted-foreground">
        Loading rules...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fd-ring"
        >
          <option value="all">All levels</option>
          <option value="MUST">MUST</option>
          <option value="SHOULD">SHOULD</option>
          <option value="MAY">MAY</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fd-ring"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-fd-muted-foreground">
        Showing {filtered.length} of {rules.length} rules
      </p>

      {/* Rules list grouped by category */}
      <div className="space-y-6">
        {[...groupedByCategory.entries()].map(([category, categoryRules]) => (
          <div key={category}>
            <h3 className="mb-2 text-sm font-semibold text-fd-foreground">
              {category}
            </h3>
            <div className="space-y-1">
              {categoryRules.map((rule) => {
                const config =
                  levelConfig[rule.level as keyof typeof levelConfig];
                return (
                  <Link
                    key={rule.id}
                    href={rule.url}
                    className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-fd-accent"
                  >
                    <span className="font-mono text-fd-muted-foreground">
                      {rule.id}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold",
                        config?.className,
                      )}
                    >
                      {rule.level}
                    </span>
                    <span className="text-fd-foreground">{rule.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-fd-muted-foreground">
          No rules match your filters.
        </p>
      )}
    </div>
  );
}
