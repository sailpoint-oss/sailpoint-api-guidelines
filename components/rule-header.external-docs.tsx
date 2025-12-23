import type { RuleLink } from "./rule-header";

export function ExternalDocs({ externalDocs }: { externalDocs?: RuleLink[] }) {
  if (!externalDocs || externalDocs.length === 0) return null;
  <div>
    <div className="text-xs font-medium text-muted-foreground">
      External docs
    </div>
    <ul className="mt-1 space-y-1">
      {externalDocs.map((l) => (
        <li key={`${l.href}-${l.label}`}>
          <a className="text-sm underline underline-offset-4" href={l.href}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>;
}
