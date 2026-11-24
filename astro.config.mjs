// @ts-check
import { defineConfig } from 'astro/config';

// 站点部署在 GitHub Pages 的项目路径下：https://digidai.github.io/niche-jobs-atlas/
// fork 之后想部署到自己的地址，改这两行即可（也可以用环境变量覆盖）。
const site = process.env.SITE_URL ?? 'https://digidai.github.io';
const base = process.env.BASE_PATH ?? '/niche-jobs-atlas';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
