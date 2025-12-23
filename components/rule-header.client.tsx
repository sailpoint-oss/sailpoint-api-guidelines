"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyRuleLinkButton({
  ruleId,
  className,
}: {
  ruleId: string;
  className?: string;
}) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const href = useMemo(() => {
    // Best effort: use the current origin if available, but keep it stable for SSR/hydration.
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}${pathname ?? ""}#${ruleId}`;
  }, [pathname, ruleId]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback: still selectable link in UI; no hard failure.
    }
  }, [href]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("h-7 w-7 p-0", className)}
      onClick={onCopy}
      aria-label={`Copy link to rule #${ruleId}`}
      title={copied ? "Copied" : "Copy link"}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}
