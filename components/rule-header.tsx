import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { CopyRuleLinkButton } from "./rule-header.client";
import { ExternalDocs } from "./rule-header.external-docs";

export type RuleLevel = "MUST" | "SHOULD" | "MAY";
export type ImplementationKind = "lsp" | "spectral" | "code" | "other";

export type RuleLink = {
  label: string;
  href: string;
};

export type ImplementationLink = RuleLink & {
  kind?: ImplementationKind;
};

function titleCaseSmart(input: string) {
  const words = input.split(/\s+/g);
  return words
    .map((raw, idx) => {
      if (!raw) return raw;
      // Preserve explicit casing for tokens that already have mixed case (OAuth, OpenAPI, ETag)
      const hasUpper = /[A-Z]/.test(raw);
      const hasLower = /[a-z]/.test(raw);
      if (hasUpper && hasLower) return raw;
      // Preserve acronyms/all-caps tokens (API, HTTP, RFC, JSON) and tokens with digits
      if (/^[A-Z0-9][A-Z0-9-_/]*$/.test(raw)) return raw;

      // Keep punctuation around the word, but title-case the core.
      const m = raw.match(/^([^A-Za-z0-9]*)([A-Za-z0-9].*?)([^A-Za-z0-9]*)$/);
      if (!m) return raw;
      const [, lead, core, trail] = m;

      // Preserve path-like tokens like /api, /v2026, /accounts
      if (lead.includes("/") && core === core.toLowerCase()) return raw;

      // Preserve common encodings/identifiers that are typically lowercase
      if (
        ["base64url", "camelcase", "kebab-case"].includes(core.toLowerCase())
      ) {
        return `${lead}${core.toLowerCase()}${trail}`;
      }

      const lower = core.toLowerCase();
      return `${lead}${lower.charAt(0).toUpperCase()}${lower.slice(1)}${trail}`;
    })
    .join(" ");
}

export function RuleHeader({
  id,
  level,
  title,
  description,
  tags,
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
  const displayTitle = titleCaseSmart(title);

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          <h2
            id={anchorId}
            className="flex flex-row gap-2 text-base font-semibold justify-between"
          >
            <div className="flex flex-row items-center gap-2">
              <Badge>#{id}</Badge>
              <span className="text-pretty">{displayTitle}</span>
            </div>
          </h2>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          Copy Rule Link <CopyRuleLinkButton ruleId={id} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ExternalDocs externalDocs={externalDocs} />

        {implementation?.length && implementation.length > 0 ? (
          <div className={cn(externalDocs?.length ? "border-t pt-3" : "")}>
            <div className="text-xs font-medium text-muted-foreground">
              Implementation
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {implementation.map((l) => {
                const kind = l.kind ?? "other";
                return (
                  <a
                    key={`${l.href}-${l.label}`}
                    href={l.href}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-foreground hover:bg-muted"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {kind.toUpperCase()}
                    </span>
                    <span className="underline underline-offset-2">
                      {l.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
