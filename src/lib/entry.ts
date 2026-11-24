import { marked } from 'marked';

/**
 * 条目正文是普通 Markdown，在 GitHub 上可以直接读。
 * 网站不整篇渲染它，而是按固定的二级标题切开，每一节用各自的版式呈现。
 * 这里顺带做格式检查：小节缺了、写法不对，构建时直接报错。
 */

const SECTION_KEYS = {
  野外观察: 'scene',
  它在做什么: 'what',
  一次完整的作业: 'steps',
  冷知识: 'facts',
  常见误认: 'myths',
  如何成为: 'path',
  资料来源: 'sources',
} as const;

type SectionKey = (typeof SECTION_KEYS)[keyof typeof SECTION_KEYS];

export interface Step {
  title: string;
  html: string;
}
export interface Myth {
  myth: string;
  fact: string;
}
export interface Source {
  title: string;
  url: string;
  meta: string;
}
export interface ParsedEntry {
  scene: string[];
  what: string[];
  steps: Step[];
  facts: string[];
  myths: Myth[];
  path: string[];
  sources: Source[];
}

const inline = (text: string): string => marked.parseInline(text.trim(), { async: false }) as string;

const paragraphs = (text: string): string[] =>
  text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, '').trim())
    .filter(Boolean)
    .map(inline);

const listItems = (text: string): string[] => {
  const items: string[] = [];
  for (const line of text.split('\n')) {
    const match = line.match(/^(?:-|\d+\.)\s+(.*)$/);
    if (match) items.push(match[1].trim());
    else if (line.trim() && items.length) items[items.length - 1] += line.trim();
  }
  return items;
};

export function parseEntry(body: string, id: string): ParsedEntry {
  const fail = (message: string): never => {
    throw new Error(`条目 ${id}：${message}`);
  };

  const raw = {} as Record<SectionKey, string>;
  for (const chunk of body.split(/^##\s+/m).slice(1)) {
    const lineEnd = chunk.indexOf('\n');
    const title = (lineEnd === -1 ? chunk : chunk.slice(0, lineEnd)).trim();
    const key = SECTION_KEYS[title as keyof typeof SECTION_KEYS];
    if (!key) fail(`不认识的小节「${title}」`);
    raw[key] = lineEnd === -1 ? '' : chunk.slice(lineEnd + 1).trim();
  }
  for (const [title, key] of Object.entries(SECTION_KEYS)) {
    if (!raw[key]) fail(`缺少小节「${title}」`);
  }

  const steps = listItems(raw.steps).map((item) => {
    const match = item.match(/^\*\*(.+?)\*\*[：:]\s*(.+)$/);
    if (!match) fail(`步骤要写成「**标题**：内容」，出错的是「${item.slice(0, 24)}…」`);
    return { title: match![1], html: inline(match![2]) };
  });

  const myths = listItems(raw.myths).map((item) => {
    const match = item.match(/^\*\*误认\*\*[：:]\s*(.+?)\s*\*\*实际\*\*[：:]\s*(.+)$/);
    if (!match) fail(`误认要写成「**误认**：… **实际**：…」，出错的是「${item.slice(0, 24)}…」`);
    return { myth: inline(match![1]), fact: inline(match![2]) };
  });

  const sources = listItems(raw.sources).map((item) => {
    const match = item.match(/^\[(.+)\]\((\S+?)\)(?:\s*·\s*(.*))?$/);
    if (!match) fail(`来源要写成「[标题](网址) · 机构，日期」，出错的是「${item.slice(0, 24)}…」`);
    return { title: match![1], url: match![2], meta: match![3] ?? '' };
  });

  const facts = listItems(raw.facts).map(inline);

  if (steps.length < 3) fail('“一次完整的作业”至少 3 步');
  if (facts.length < 2) fail('“冷知识”至少 2 条');
  if (myths.length < 1) fail('“常见误认”至少 1 组');
  if (sources.length < 3) fail('“资料来源”至少 3 条');

  return {
    scene: paragraphs(raw.scene),
    what: paragraphs(raw.what),
    steps,
    facts,
    myths,
    path: paragraphs(raw.path),
    sources,
  };
}
