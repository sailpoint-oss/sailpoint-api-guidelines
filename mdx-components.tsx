import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { RuleHeader } from "@/components/rule-header";
import { RulesIndex } from "@/components/rules-index";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    RuleHeader,
    RulesIndex,
    ...components,
  };
}
