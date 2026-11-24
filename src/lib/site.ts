export const SITE = {
  title: '小众职业图鉴',
  subtitle: '把冷门职业当成稀有物种来观察',
  description:
    '一本关于冷门职业的野外手册：嗅辨员、听漏工、饱和潜水员、守时人、拟音师……每个职业一页图版和一段现场笔记，每一条事实都注明来源。',
  repo: 'https://github.com/Digidai/niche-jobs-atlas',
  edition: '第一辑',
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 拼出带部署前缀的站内地址。 */
export const url = (path = '/'): string => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

export const pad = (no: number): string => String(no).padStart(3, '0');

/** 稀有度：按全国从业人数的量级估计。 */
export const RARITY: Record<number, { label: string; range: string }> = {
  5: { label: '极罕见', range: '不足 100 人' },
  4: { label: '罕见', range: '100–1000 人' },
  3: { label: '稀有', range: '1000–1 万人' },
  2: { label: '少见', range: '1 万–10 万人' },
  1: { label: '隐秘常见', range: '10 万人以上' },
};

export const TREND: Record<'up' | 'flat' | 'down', { label: string; glyph: string }> = {
  up: { label: '种群增长', glyph: '↗' },
  flat: { label: '大体稳定', glyph: '→' },
  down: { label: '正在减少', glyph: '↘' },
};

export const STAT_LABELS = { risk: '危险', solitude: '孤独', barrier: '门槛' } as const;
