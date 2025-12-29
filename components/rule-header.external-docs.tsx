import type { RuleLink } from "./rule-header";

export function ExternalDocs({ externalDocs }: { externalDocs?: RuleLink[] }) {
  if (!externalDocs || externalDocs.length === 0) return null;
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">
        References
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {externalDocs.map((l) => (
          <a
            key={`${l.href}-${l.label}`}
            href={l.href}
            target="_blank"
            className="inline-flex items-center rounded-md border px-2 py-1 text-xs text-foreground hover:bg-muted"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
