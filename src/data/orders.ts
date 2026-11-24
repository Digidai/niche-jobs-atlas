/** 六个“目”。顺序即图鉴的章节顺序。 */
export const ORDER_KEYS = ['感官目', '极境目', '守望目', '生灵目', '造梦目', '时光目'] as const;

export type OrderKey = (typeof ORDER_KEYS)[number];

export interface Order {
  key: OrderKey;
  slug: string;
  /** 戏拟的拉丁文目名 */
  latin: string;
  numeral: string;
  tagline: string;
  blurb: string;
  /** 这一目的图版主色 */
  color: string;
}

export const ORDERS: Order[] = [
  {
    key: '感官目',
    slug: 'sensoria',
    latin: 'Sensoria',
    numeral: '壹',
    tagline: '靠鼻子、耳朵和指尖吃饭',
    blurb: '这一目的成员把鼻子、耳朵、眼睛和手指当仪器用，判断靠的是成千上万次重复练出来的手感。',
    color: '#a67716',
  },
  {
    key: '极境目',
    slug: 'extremia',
    latin: 'Extremia',
    numeral: '贰',
    tagline: '上高空，下深海，钻进地底',
    blurb: '栖息地在普通人去不了的地方：三百米深的海底，塔吊的顶端，带电的导线，行驶中的船舷。',
    color: '#35627f',
  },
  {
    key: '守望目',
    slug: 'vigilia',
    latin: 'Vigilia',
    numeral: '叁',
    tagline: '守着一样东西过日子',
    blurb: '它们守着一盏灯、一片林子、一组钟、一条跑道或者一朵云。工作成果常常只有两个字：无事。',
    color: '#2c5a4c',
  },
  {
    key: '生灵目',
    slug: 'animalia',
    latin: 'Animalia',
    numeral: '肆',
    tagline: '同事不是人类',
    blurb: '工作对象是牛、蚊子、毒蛇、狗和走丢的猫。跟它们讲不了道理，只能学着读懂它们。',
    color: '#a04e2b',
  },
  {
    key: '造梦目',
    slug: 'illusoria',
    latin: 'Illusoria',
    numeral: '伍',
    tagline: '作品人人见过，名字没人知道',
    blurb: '电影里的脚步声，游戏里的“天命人”，你正在读的这些字，都是有人做出来的。',
    color: '#72466c',
  },
  {
    key: '时光目',
    slug: 'temporalia',
    latin: 'Temporalia',
    numeral: '陆',
    tagline: '修补旧物，送别故人',
    blurb: '它们和旧纸、石头里的骨头、逝者留下的东西打交道。这一目动作最慢，也最需要安静。',
    color: '#5c4937',
  },
];

export const orderOf = (key: OrderKey): Order => ORDERS.find((o) => o.key === key)!;
