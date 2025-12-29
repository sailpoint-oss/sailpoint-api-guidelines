import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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

export function RuleHeader({
  id,
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
  const anchorId = id;
  return (
    <Card size="sm">
      <CardContent className="flex flex-row items-center justify-between gap-3 py-3">
        <ExternalDocs externalDocs={externalDocs} />
        <Implementation implementation={implementation} />
        <CopyRuleLinkButton ruleId={id} showLabel />
      </CardContent>
    </Card>
  );
}
