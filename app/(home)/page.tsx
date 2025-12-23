import Image from 'next/image';
import Link from 'next/link';

const popularRuleCategories = [
  { title: "Resource Modeling & URLs", href: "/docs/rules/resource-modeling-and-urls" },
  { title: "Security & Authorization", href: "/docs/rules/security-and-authorization" },
  { title: "HTTP Semantics", href: "/docs/rules/http-semantics" },
  { title: "Lifecycle & Compatibility", href: "/docs/rules/lifecycle-and-compatibility" },
  { title: "Requests & Querying", href: "/docs/rules/requests-and-querying" },
  { title: "Payload Conventions", href: "/docs/rules/payload-conventions" },
] as const;

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 sm:gap-16 sm:py-20">
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/api-guild.png"
              alt="SailPoint"
              priority
              className="h-8 w-auto select-none"
              width={140}
              height={32}
            />
            <span className="text-sm font-medium text-fd-muted-foreground">
              API style &amp; design guidelines
            </span>
          </div>

          <div className="flex max-w-3xl flex-col gap-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Design APIs with intention.
            </h1>
            <p className="text-pretty text-lg text-fd-muted-foreground">
              Opinionated guard rails for designing consistent, secure, evolvable APIs—built for teams
              shipping integrations to customers and partners.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              className="inline-flex items-center justify-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground shadow-sm transition hover:opacity-90"
              href="/docs"
            >
              Start here
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-md border border-fd-border bg-fd-background px-5 py-2.5 text-sm font-medium text-fd-foreground shadow-sm transition hover:bg-fd-accent"
              href="/docs/rules"
            >
              Browse rules
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-md border border-fd-border bg-fd-background px-5 py-2.5 text-sm font-medium text-fd-foreground shadow-sm transition hover:bg-fd-accent"
              href="/docs/guides"
            >
              Read guides
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
            <p className="text-sm font-medium text-fd-muted-foreground">Normative</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Rules</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              The must/should guidance. Each rule is stable, linkable, and tracked by ID.
            </p>
            <Link className="mt-4 inline-flex text-sm font-medium underline underline-offset-4" href="/docs/rules">
              Open Rules
            </Link>
          </div>

          <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
            <p className="text-sm font-medium text-fd-muted-foreground">Non-normative</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Guides</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              Rationale, patterns, and examples that support the rules and help teams apply them.
            </p>
            <Link className="mt-4 inline-flex text-sm font-medium underline underline-offset-4" href="/docs/guides">
              Open Guides
            </Link>
          </div>

          <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
            <p className="text-sm font-medium text-fd-muted-foreground">Tooling</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Search &amp; automation</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              Use site search (<kbd className="rounded border px-1.5 py-0.5">⌘</kbd>{' '}
              <kbd className="rounded border px-1.5 py-0.5">K</kbd>) or consume the rules as JSON.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              <Link className="text-sm font-medium underline underline-offset-4" href="/docs">
                Start here
              </Link>
              <Link className="text-sm font-medium underline underline-offset-4" href="/rules.json">
                rules.json
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-fd-border bg-fd-background p-6 shadow-sm">
            <h2 className="text-base font-semibold tracking-tight">How to use this hub</h2>
            <ul className="mt-3 space-y-2 text-sm text-fd-muted-foreground">
              <li>
                <span className="font-medium text-fd-foreground">Start with</span> the overview to align on
                principles and terminology.
              </li>
              <li>
                <span className="font-medium text-fd-foreground">Apply</span> Rules during API design, reviews,
                and implementation.
              </li>
              <li>
                <span className="font-medium text-fd-foreground">Use</span> Guides for rationale, patterns, and
                examples.
              </li>
              <li>
                <span className="font-medium text-fd-foreground">Reference</span> Appendices for checklists,
                glossary, and recipe-style guidance.
              </li>
            </ul>

            <div className="mt-4 grid gap-3">
              <div>
                <p className="text-sm font-medium text-fd-foreground">External readers</p>
                <p className="text-sm text-fd-muted-foreground">
                  Use Rules as a contract checklist and Guides/Appendices for practical patterns.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-fd-foreground">Internal teams</p>
                <p className="text-sm text-fd-muted-foreground">
                  Cite rule IDs in reviews and keep OpenAPI as the single source of truth.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-fd-border bg-fd-background p-6 shadow-sm">
            <h2 className="text-base font-semibold tracking-tight">Popular rule categories</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {popularRuleCategories.map((item) => (
                <li key={item.href}>
                  <Link className="text-fd-foreground underline underline-offset-4" href={item.href}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="flex flex-col gap-2 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Open source API guideline hub for SailPoint teams, customers, and partners.</p>
          <a
            className="inline-flex underline underline-offset-4"
            href="https://github.com/sailpoint-oss/sailpoint-api-guidelines"
            rel="noreferrer noopener"
            target="_blank"
          >
            View on GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}



