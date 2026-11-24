// 给网站裁出最小的中文字体子集。
//
// 中文字体一个字重就有二三十 MB，不可能整个放到网页上。这个脚本先读构建好的 dist/，
// 看标题和手写体实际用到了哪些字，再从完整字体里只裁出这些字，生成几个 woff2。
//
// 用法：npm run fonts（会先构建一次站点）。新增条目之后跑一遍，把生成的文件一起提交。
// 完整字体下载到 .cache/fonts/，不入库。三套字体都是 SIL OFL 许可。

import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import subsetFont from 'subset-font';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const CACHE = join(ROOT, '.cache', 'fonts');
const OUT = join(ROOT, 'src', 'assets', 'fonts');
const CSS = join(ROOT, 'src', 'styles', 'fonts.css');

const GOOGLE_FONTS = 'https://raw.githubusercontent.com/google/fonts';
const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const PUNCT = '·–—‘’“”…×→↗↘←';

/** @type {{ family: string, file: string, source: string, url: string, weight: number, style?: string, selector?: string, firstLetter?: string, extra?: string, only?: string, unicodeRange?: string, options?: object }[]} */
const FONTS = [
  {
    // 标题：思源宋体 Black
    family: 'Atlas Song',
    file: 'atlas-song.woff2',
    source: 'NotoSerifSC-VF.ttf',
    url: `${GOOGLE_FONTS}/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf`,
    weight: 900,
    options: { variationAxes: { wght: 900 } },
    selector:
      'h1, h2, h3, .brand-name, .seal, .btn, .hero-title, .order-numeral, .stamp, .label-title, .sec-no, .pager-link b, th, td:first-child, .scale dt, .scale dd b, .plain-list b, .foot-title',
    // 现场段的首字下沉也用这套字
    firstLetter: '.scene-dropcap p:first-child',
    // 图版 024 里那个“永”字
    extra: '永',
  },
  {
    // 一句话简介和旁白：霞鹜文楷
    family: 'Atlas Kai',
    file: 'atlas-kai.woff2',
    source: 'LXGWWenKai-Regular.ttf',
    url: 'https://github.com/lxgw/LxgwWenKai/releases/download/v1.530/LXGWWenKai-Regular.ttf',
    weight: 400,
    selector: '.lede, .card-hook, .entry-hook, .order-tagline, .no-result',
  },
  {
    // 数字：IM Fell 的数字是老式的，0 像 o、1 像 I，编号容易看错，所以数字单独取思源宋体的
    family: 'Atlas Num',
    file: 'atlas-num.woff2',
    source: 'NotoSerifSC-VF.ttf',
    url: `${GOOGLE_FONTS}/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf`,
    weight: 400,
    options: { variationAxes: { wght: 600 } },
    only: '0123456789',
    unicodeRange: 'U+0030-0039',
  },
  {
    // 编号和拉丁文：IM Fell English
    family: 'Atlas Fell',
    file: 'atlas-fell.woff2',
    source: 'IMFeENrm28P.ttf',
    url: `${GOOGLE_FONTS}/8d618a0e96499047423510abb2c5ee9f475b987a/ofl/imfellenglish/IMFeENrm28P.ttf`,
    weight: 400,
  },
  {
    family: 'Atlas Fell',
    file: 'atlas-fell-italic.woff2',
    source: 'IMFeENit28P.ttf',
    url: `${GOOGLE_FONTS}/8d618a0e96499047423510abb2c5ee9f475b987a/ofl/imfellenglish/IMFeENit28P.ttf`,
    weight: 400,
    style: 'italic',
  },
];

async function htmlFiles(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) out.push(...(await htmlFiles(path)));
    else if (name.endsWith('.html')) out.push(path);
  }
  return out;
}

async function source(font) {
  const path = join(CACHE, font.source);
  if (!existsSync(path)) {
    console.log(`  下载 ${font.source} …`);
    const res = await fetch(font.url);
    if (!res.ok) throw new Error(`下载失败（${res.status}）：${font.url}`);
    await mkdir(CACHE, { recursive: true });
    await writeFile(path, Buffer.from(await res.arrayBuffer()));
  }
  return readFile(path);
}

if (!existsSync(DIST)) {
  console.error('没有找到 dist/。请用 npm run fonts，它会先构建一次站点。');
  process.exit(1);
}

const pages = await Promise.all((await htmlFiles(DIST)).map(async (file) => parse(await readFile(file, 'utf8'))));
await mkdir(OUT, { recursive: true });

const rules = [];
for (const font of FONTS) {
  const chars = new Set(font.only ?? ASCII + PUNCT + (font.extra ?? ''));
  for (const page of font.only ? [] : pages) {
    if (font.selector) {
      for (const el of page.querySelectorAll(font.selector)) {
        for (const ch of el.text) if (ch.trim()) chars.add(ch);
      }
    }
    if (font.firstLetter) {
      for (const el of page.querySelectorAll(font.firstLetter)) {
        const first = [...el.text.trim()][0];
        if (first) chars.add(first);
      }
    }
  }
  const text = [...chars].join('');
  const buffer = await subsetFont(await source(font), text, { targetFormat: 'woff2', ...font.options });
  await writeFile(join(OUT, font.file), buffer);
  console.log(`  ${font.file}：${chars.size} 个字符，${(buffer.length / 1024).toFixed(1)} KB`);
  const range = font.unicodeRange ? `\n  unicode-range: ${font.unicodeRange};` : '';
  rules.push(
    `@font-face {\n  font-family: '${font.family}';\n  font-style: ${font.style ?? 'normal'};\n  font-weight: ${font.weight};\n  font-display: swap;\n  src: url('../assets/fonts/${font.file}') format('woff2');${range}\n}`,
  );
}

await writeFile(
  CSS,
  `/* 这个文件由 scripts/build-fonts.mjs 生成，不要手改。\n   字体是按网站实际用到的字裁出来的子集：思源宋体、霞鹜文楷、IM Fell English，均为 SIL OFL 许可。 */\n\n${rules.join('\n\n')}\n`,
);
console.log('  已更新 src/styles/fonts.css');
