import { createRuleLinkRegex } from "./rule-links";

type MdastNode = {
  type: string;
  value?: string;
  url?: string;
  title?: string | null;
  children?: MdastNode[];
};

type MdastParent = MdastNode & {
  children: MdastNode[];
};

function isParent(node: MdastNode): node is MdastParent {
  return Array.isArray(node.children);
}

function createRuleLinkNode(ruleId: string): MdastNode {
  return {
    type: "link",
    url: `#${ruleId}`,
    title: null,
    children: [{ type: "text", value: `[#${ruleId}]` }],
  };
}

function splitRuleLinks(value: string): MdastNode[] {
  const nodes: MdastNode[] = [];
  const ruleLinkRegex = createRuleLinkRegex();
  let lastIndex = 0;

  for (const match of value.matchAll(ruleLinkRegex)) {
    const ruleId = match[1];
    if (!ruleId || match.index === undefined) continue;

    if (match.index > lastIndex) {
      nodes.push({ type: "text", value: value.slice(lastIndex, match.index) });
    }

    nodes.push(createRuleLinkNode(ruleId));
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) return [{ type: "text", value }];
  if (lastIndex < value.length) {
    nodes.push({ type: "text", value: value.slice(lastIndex) });
  }

  return nodes;
}

function transformRuleLinks(node: MdastNode): void {
  if (!isParent(node) || node.type === "link") return;

  const transformedChildren: MdastNode[] = [];

  for (const child of node.children) {
    if (child.type === "text" && typeof child.value === "string") {
      transformedChildren.push(...splitRuleLinks(child.value));
      continue;
    }

    transformRuleLinks(child);
    transformedChildren.push(child);
  }

  node.children = transformedChildren;
}

export function remarkRuleIdLinks() {
  return (tree: MdastNode) => {
    transformRuleLinks(tree);
  };
}
