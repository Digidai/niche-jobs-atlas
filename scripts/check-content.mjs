// 条目的文字检查：编号、排版，以及几种我们不想要的腔调。
// 用法：npm run check。格式本身（小节是否齐全等）由构建时的 src/lib/entry.ts 检查。

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR = join(ROOT, 'src', 'content', 'jobs');
const PLATES = join(ROOT, 'src', 'plates');

/** 套话和空架子。命中不一定是错，但值得回头再看一眼。 */
const TICS = [
  [/不是[^。！？\n]{0,24}而是/, '“不是……而是……”'],
  [/不仅[^。！？\n]{0,24}(更|还|也)/, '“不仅……更……”'],
  [/真正/, '“真正”'],
  [/其实/, '“其实”'],
  [/本质上|说白了|归根结底|换句话说/, '总结腔'],
  [/值得一提|众所周知|毋庸置疑|不言而喻/, '垫话'],
  [/让我们|你知道吗|想象一下/, '招呼读者'],
  [/默默(奉献|坚守|付出)|致敬|可敬可爱/, '宣传腔'],
  [/在这个[^。\n]{0,12}时代/, '“在这个……时代”'],
  [/！！|？！/, '叠用标点'],
];

const CJK = '\\u4e00-\\u9fff';
const TIGHT = new RegExp(`[${CJK}][A-Za-z0-9]|[A-Za-z0-9][${CJK}]`, 'g');

const errors = [];
const warnings = [];
const seen = new Map();

const files = (await readdir(DIR)).filter((name) => name.endsWith('.md')).sort();

for (const file of files) {
  const raw = await readFile(join(DIR, file), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}：缺少 frontmatter`);
    continue;
  }
  const [, front, body] = match;
  const no = Number(front.match(/^no:\s*(\d+)/m)?.[1]);
  const prefix = Number(file.slice(0, 3));

  if (!/^\d{3}-[a-z0-9-]+\.md$/.test(file)) errors.push(`${file}：文件名应为“三位编号-英文短名.md”`);
  if (no !== prefix) errors.push(`${file}：文件名编号 ${prefix} 与 frontmatter 里的 no: ${no} 不一致`);
  if (seen.has(no)) errors.push(`${file}：编号 ${no} 与 ${seen.get(no)} 重复`);
  seen.set(no, file);
  if (!existsSync(join(PLATES, `${file.slice(0, 3)}.svg`))) warnings.push(`${file}：还没有图版 src/plates/${file.slice(0, 3)}.svg`);

  const lines = `${front}\n${body}`.split('\n');
  lines.forEach((line, index) => {
    const where = `${file}:${index + 2}`;
    // 来源列表里是别人的标题，引号里是别人的原话，都不做腔调和排版检查
    const isSource = /^- \[.*\]\(https?:\/\//.test(line);
    const own = line
      .replace(/\]\([^)]*\)/g, ']')
      .replace(/“[^”]*”/g, '“”')
      .replace(/"[^"]*"/g, '""');

    if (!isSource) {
      for (const [pattern, label] of TICS) {
        if (pattern.test(own)) warnings.push(`${where}：${label}　${line.trim().slice(0, 40)}`);
      }
      const tight = own.match(TIGHT);
      if (tight) warnings.push(`${where}：中文和英文、数字之间少了空格（${[...new Set(tight)].join(' ')}）`);
    }
    // frontmatter 里 aka: [甲, 乙] 这样的数组用的是 YAML 的逗号，不算
    const isYamlList = /^[a-zA-Z]+:\s*\[.*\]$/.test(line);
    if (!isYamlList && !isSource && /[\u4e00-\u9fff”][,;!?]|[,;!?][\u4e00-\u9fff“]/.test(own)) warnings.push(`${where}：中文里用了半角标点`);
    if (!isSource && /\.\.\./.test(own)) warnings.push(`${where}：省略号请用“……”`);
    if (isSource && !/^- \[.+\]\(https?:\/\/\S+\)( · .+)?$/.test(line)) errors.push(`${where}：来源格式应为“- [标题](网址) · 机构，日期”`);
  });
}

for (let n = 1; n <= files.length; n += 1) {
  if (!seen.has(n)) errors.push(`编号 ${n} 缺失：编号应该从 1 连续排下去`);
}

for (const item of warnings) console.log(`提醒  ${item}`);
for (const item of errors) console.log(`错误  ${item}`);
console.log(`\n检查了 ${files.length} 个条目：${errors.length} 处错误，${warnings.length} 处提醒。`);
process.exit(errors.length ? 1 : 0);
