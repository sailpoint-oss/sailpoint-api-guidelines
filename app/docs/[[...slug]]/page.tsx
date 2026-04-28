import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getRuleIdFromHash } from "lib/rule-links";
import { getPageImage, source } from "lib/source";
import { getMDXComponents } from "mdx-components";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

import rulesData from "@/public/rules.json";

const ruleUrlById = new Map(
  rulesData.rules.map((rule) => [rule.id, rule.url] as const),
);

function resolveRuleHref(href?: string) {
  if (!href) return href;
  const ruleId = getRuleIdFromHash(href);
  if (!ruleId) return href;
  return ruleUrlById.get(ruleId) ?? href;
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const RelativeLink = createRelativeLink(source, page);

  const RuleAwareLink = (props: ComponentPropsWithoutRef<"a">) => {
    const href =
      typeof props.href === "string" ? resolveRuleHref(props.href) : props.href;
    return <RelativeLink {...props} href={href} />;
  };

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // Support both relative doc links and stable rule-id links like [#support-offset-pagination].
            a: RuleAwareLink,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
