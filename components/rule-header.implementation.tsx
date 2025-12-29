import { cn } from "@/lib/utils";
import type { ImplementationLink } from "./rule-header";

export function Implementation({ implementation }: { implementation?: ImplementationLink[] }) {
  if (!implementation || implementation.length === 0) return null;
  return (
    <div className={cn(implementation?.length ? "border-t pt-3" : "")}>
      <div className="text-xs font-medium text-muted-foreground">
        Implementation
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
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
  );
}
