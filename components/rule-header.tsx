import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { CopyRuleLinkButton } from "./rule-header.client";
import { ExternalDocs } from "./rule-header.external-docs";
import { Implementation } from "./rule-header.implementation";

export type RuleLevel = "MUST" | "SHOULD" | "MAY";
export type ImplementationKind = "lsp" | "spectral" | "code" | "other";

export type RuleLink = {
  label: string;
  href: string;
};

export type ImplementationLink = RuleLink & {
  kind?: ImplementationKind;
};

export type RuleExample = {
  label?: string;
  lang: "yaml" | "json" | "http" | "ts" | "bash" | "text";
  code: string;
};

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

function LevelBadge({ level }: { level: RuleLevel }) {
  const config = levelConfig[level];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

function RuleId({ id }: { id: string }) {
  return (
    <span className="font-mono text-sm font-semibold text-foreground">
      {id}
    </span>
  );
}

function uniqueTabLabels(examples: RuleExample[]): string[] {
  const seen = new Map<string, number>();
  return examples.map((ex, i) => {
    const base = ex.label ?? `${ex.lang.toUpperCase()} ${i + 1}`;
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base} (${n + 1})`;
  });
}

function RuleExamples({ examples }: { examples: RuleExample[] }) {
  if (examples.length === 0) return null;

  if (examples.length === 1) {
    const [only] = examples;
    return (
      <div className="mt-3">
        <DynamicCodeBlock lang={only.lang} code={only.code} />
      </div>
    );
  }

  const items = uniqueTabLabels(examples);

  return (
    <div className="mt-3">
      <Tabs items={items}>
        {examples.map((ex, i) => (
          <Tab key={items[i]} value={items[i]}>
            <DynamicCodeBlock lang={ex.lang} code={ex.code} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export function RuleHeader({
  id,
  level,
  externalDocs,
  implementation,
  examples,
}: {
  id: string;
  level: RuleLevel;
  title: string;
  description?: string;
  tags?: string[];
  externalDocs?: RuleLink[];
  implementation?: ImplementationLink[];
  examples?: RuleExample[];
}) {
  const hasLinks =
    (externalDocs && externalDocs.length > 0) ||
    (implementation && implementation.length > 0);

  const hasExamples = examples && examples.length > 0;

  return (
    <>
      {/* Stable anchor target for deep links */}
      <span id={id} className="scroll-mt-28 block" aria-hidden="true" />
      <Card size="sm">
        <CardContent className={cn("py-3", hasLinks ? "space-y-3" : "")}>
          {/* Top row: Rule ID + Badge + Copy link */}
          <div className="flex items-center gap-3">
            <RuleId id={id} />
            <LevelBadge level={level} />
            <div className="ml-auto">
              <CopyRuleLinkButton ruleId={id} showLabel />
            </div>
          </div>

          {/* Bottom row: External docs and implementation links */}
          {hasLinks && (
            <div className="flex flex-wrap items-start gap-x-6 gap-y-3 border-t pt-3">
              <ExternalDocs externalDocs={externalDocs} />
              <Implementation implementation={implementation} />
            </div>
          )}
        </CardContent>
      </Card>
      {hasExamples && <RuleExamples examples={examples} />}
    </>
  );
}
