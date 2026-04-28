export const RULE_ID_PATTERN = "[a-z][a-z0-9-]*";
export const RULE_LINK_PATTERN = String.raw`\[#(${RULE_ID_PATTERN})\]`;
export const RULE_HASH_PATTERN = `#(${RULE_ID_PATTERN})`;

export function createRuleLinkRegex(): RegExp {
  return new RegExp(RULE_LINK_PATTERN, "g");
}

export function getRuleIdFromHash(href: string): string | null {
  const match = href.match(new RegExp(`^${RULE_HASH_PATTERN}$`));
  return match?.[1] ?? null;
}
