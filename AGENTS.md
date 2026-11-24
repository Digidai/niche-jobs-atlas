# 给 AI 协作者的说明

这是《小众职业图鉴》：一个 Astro 静态站点，把冷门职业当成稀有物种来写。动手之前先读 [README.md](README.md) 和 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 开发

需要 Node.js 22.23 以上（建议 24）。启动开发服务器请用后台模式：

```
astro dev --background
```

用 `astro dev stop`、`astro dev status`、`astro dev logs` 管理它。站点部署在子路径下，本地地址是 `http://localhost:4321/niche-jobs-atlas/`。

改完之后依次跑：

```
npm run check   # 条目的编号、排版、腔调
npm run build   # 条目格式不对会在这里报错
npm run index   # 条目有增删改名时，更新 README 的收录目录
npm run fonts   # 条目有增改时，重新裁剪中文字体子集
```

## 这个项目的规矩

- **事实第一**。条目里的每一条事实都要有你实际打开读过的来源；引语必须是来源里的原话；数字带年份和口径；查不到就写“查不到”。不要凭记忆补细节，不要虚构现场里的人物、对话和情节。
- **条目格式是固定的**。`src/content/jobs/NNN-slug.md`，frontmatter 字段见 `src/content.config.ts`，正文七个二级标题的名字和顺序见 `src/lib/entry.ts`。站内链接一律经过 `src/lib/site.ts` 里的 `url()`，因为站点有部署前缀。
- **文风**。写具体的名词、数字和动作；不用“不是……而是……”“不仅……更……”“真正”“其实”；不写宣传腔；不拿从业者开玩笑，写与死亡有关的职业时收起玩笑。中文和英文、数字之间留空格，引语保持原样。
- **图版**。`src/plates/NNN.svg`，画布 400×300，只用 `currentColor`、`var(--accent)`、`var(--tint)`、`var(--plate-fill)`。**SVG 文件里只写 ASCII 字符**（有的编辑工具会把 .svg 里的中文写坏），中文说明放在 `src/data/plates.ts`。动效用 `src/styles/global.css` 里现成的 `a-*` class。
- **不要手改生成的文件**：`src/styles/fonts.css`、`src/assets/fonts/*.woff2`、README 里两个 `index` 标记之间的内容。

## Astro 文档

完整文档：https://docs.astro.build

- [路由与页面](https://docs.astro.build/en/guides/routing/)
- [Astro 组件](https://docs.astro.build/en/basics/astro-components/)
- [内容集合](https://docs.astro.build/en/guides/content-collections/)
- [样式](https://docs.astro.build/en/guides/styling/)
