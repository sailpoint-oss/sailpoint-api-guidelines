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
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

export function RuleHeader({
  id,
  level,
  externalDocs,
  implementation,
}: {
  id: string;
  level: RuleLevel;
  title: string;
  description?: string;
  tags?: string[];
  externalDocs?: RuleLink[];
  implementation?: ImplementationLink[];
}) {
  return (
    <>
      {/* Stable anchor target for deep links */}
      <span id={id} className="scroll-mt-28 block" aria-hidden="true" />
      <Card size="sm">
        <CardContent className="flex flex-row items-center justify-between gap-3 py-3">
          <LevelBadge level={level} />
          <ExternalDocs externalDocs={externalDocs} />
          <Implementation implementation={implementation} />
          <CopyRuleLinkButton ruleId={id} showLabel />
        </CardContent>
      </Card>
    </>
  );
}
