// 根据条目的 frontmatter，重写 README.md 里的收录目录（两个 index 标记之间的部分）。
// 用法：npm run index。新增或改动条目之后跑一遍。

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR = join(ROOT, 'src', 'content', 'jobs');
const README = join(ROOT, 'README.md');
const SITE = 'https://digidai.github.io/niche-jobs-atlas';

const ORDERS = [
  ['感官目', '靠鼻子、耳朵和指尖吃饭'],
  ['极境目', '上高空，下深海，钻进地底'],
  ['守望目', '守着一样东西过日子'],
  ['生灵目', '同事不是人类'],
  ['造梦目', '作品人人见过，名字没人知道'],
  ['时光目', '修补旧物，送别故人'],
];

const field = (front, key) => front.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim() ?? '';

const jobs = [];
for (const file of (await readdir(DIR)).filter((name) => name.endsWith('.md')).sort()) {
  const front = (await readFile(join(DIR, file), 'utf8')).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  jobs.push({
    file,
    slug: file.replace(/\.md$/, '').replace(/^\d+-/, ''),
    no: field(front, 'no').padStart(3, '0'),
    name: field(front, 'name'),
    en: field(front, 'en'),
    hook: field(front, 'hook'),
    order: field(front, 'order'),
    rarity: Number(field(front, 'rarity')),
  });
}

const pips = (n) => '●'.repeat(n) + '○'.repeat(5 - n);
const sections = ORDERS.map(([order, tagline]) => {
  const rows = jobs
    .filter((job) => job.order === order)
    .map(
      (job) =>
        `| ${job.no} | [**${job.name}**](${SITE}/jobs/${job.slug}/)<br><sub>${job.en}</sub> | ${job.hook} | ${pips(job.rarity)} | [原文](src/content/jobs/${job.file}) |`,
    );
  return `### ${order}　${tagline}\n\n| No. | 职业 | 一句话 | 稀有度 | 条目 |\n| :-: | :-- | :-- | :-: | :-: |\n${rows.join('\n')}`;
});

const readme = await readFile(README, 'utf8');
const start = '<!-- index:start -->';
const end = '<!-- index:end -->';
const from = readme.indexOf(start);
const to = readme.indexOf(end);
if (from === -1 || to === -1) throw new Error('README.md 里找不到 index 标记');

await writeFile(README, `${readme.slice(0, from + start.length)}\n\n${sections.join('\n\n')}\n\n${readme.slice(to)}`);
console.log(`已把 ${jobs.length} 个条目写进 README.md 的收录目录。`);
