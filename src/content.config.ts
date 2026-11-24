import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ORDER_KEYS } from './data/orders';

const score = z.number().int().min(1).max(5);

const jobs = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/jobs',
    // 文件名形如 001-odor-panelist.md，网址只取后半段：/jobs/odor-panelist/
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/^\d+-/, ''),
  }),
  schema: z.object({
    /** 图鉴编号 */
    no: z.number().int().positive(),
    /** 中文名 */
    name: z.string(),
    /** 俗名、别称 */
    aka: z.array(z.string()).default([]),
    /** 英文名 */
    en: z.string(),
    /** 戏拟学名（仿拉丁文，纯属玩笑） */
    latin: z.string(),
    /** 所属的“目” */
    order: z.enum(ORDER_KEYS),
    /** 一句话钩子 */
    hook: z.string().max(40),
    /** 栖息地 */
    habitat: z.string(),
    /** 出没时间 */
    active: z.string(),
    /** 识别特征：随身装备 */
    gear: z.array(z.string()).min(2).max(6),
    /** 天敌 */
    nemesis: z.string(),
    /** 种群数量：带年份和口径 */
    population: z.string(),
    /** 稀有度：5 极罕见 … 1 隐秘常见，见凡例 */
    rarity: score,
    /** 种群趋势 */
    trend: z.enum(['up', 'flat', 'down']),
    trendNote: z.string(),
    /** 分类地位：《职业分类大典》里的名字，或“未定名” */
    status: z.string(),
    /** 编者主观评分，1–5 */
    stats: z.object({ risk: score, solitude: score, barrier: score }),
    /** 最后核对日期 */
    updated: z.coerce.date(),
  }),
});

export const collections = { jobs };
