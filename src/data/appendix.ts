/** 附录页的数据：伪物种辨析、灭绝与新发现、待收录名单。核对截止 2026-11-24。 */

export interface Ref {
  title: string;
  url: string;
}

export interface Verdict {
  name: string;
  stamp: string;
  text: string;
  refs: Ref[];
}

export const VERDICTS: Verdict[] = [
  {
    name: '企鹅扶正员',
    stamp: '查无此种',
    text: '传说南极的企鹅仰头看飞机会仰面摔倒，得有专人把它们一只只扶起来。英国南极调查局在南乔治亚岛观察了约 1000 只王企鹅，一共五个星期，直升机飞过时没有一只倒下。被点名“设有此岗”的爱丁堡动物园也说，没有这个职位。',
    refs: [
      { title: 'BBC News（2001）', url: 'http://news.bbc.co.uk/2/hi/science/nature/1149900.stm' },
      { title: 'AFP Fact Check（2019）', url: 'https://factcheck.afp.com/no-edinburgh-zoo-does-not-employ-penguin-erector' },
    ],
  },
  {
    name: '高薪熊猫饲养员',
    stamp: '营销夸大',
    text: '“年薪百万陪熊猫玩”查不到出处。查得到的是 2014 年的“熊猫帮主”招募：年薪 20 万元，由汽车品牌福特赞助，招聘方说胜出者“更像志愿者”。现实里，江苏一家景区的熊猫饲养员每月到手约五千元，做六休一（2023）；成都大熊猫繁育研究基地 2025 年招编外“科技饲养员”，面试之前要先测负重 15 公斤折返的耐力。',
    refs: [
      { title: '中国广播网（2014）', url: 'https://www.chinanews.com/sh/2014/05-11/6157037.shtml' },
      { title: '武汉晚报（2023）', url: 'https://www.peopleapp.com/column/30039440150-500004424725' },
      { title: '成都大熊猫繁育研究基地招聘公告（2025）', url: 'https://m.panda.org.cn/cn/news/notice/2025-07-22/8807.html' },
    ],
  },
  {
    name: '酒店试睡员',
    stamp: '不是躺赚',
    text: '真有过这个岗位。2010 年的报道称全国只有 6 位上岗者，税前月薪 1 万元，每月至少试睡 10 家酒店。到 2014 年，平台方已经表示“全职的试睡员是已经没有的了”。2022 年一位从业者说，“90%以上都是置换”，也就是拿免费住宿换推广内容。',
    refs: [
      { title: '华西都市报（2010）', url: 'https://history.thecover.cn/old/epaper/hxdsb/html/2010-07/28/content_216808.htm' },
      { title: '中国广播网（2014）', url: 'http://i1.ce.cn/district/newarea/roll/201405/06/t20140506_2772150.shtml' },
      { title: '豹变（2022）', url: 'http://www.21jingji.com/article/20220915/herald/85fb2b1c342cdfa37166a23b61bd7547.html' },
    ],
  },
  {
    name: '凶宅试睡员',
    stamp: '营销与骗局',
    text: '2020 年 12 月，阿里拍卖招过一名“凶宅试住主播”，每分钟 1 元，直播 24 小时，为的是给苏州一套法拍房引流。2023 年 2 月杭州出现“日薪 2000 元招凶宅试睡员”的招聘，当地通报是“公司员工凭空捏造”；同一篇通报里，昆明有人应聘同类岗位，被骗走 3457 元。',
    refs: [
      { title: '潇湘晨报（2020）', url: 'https://hn.rednet.cn/content/2020/12/04/8682297.html' },
      { title: '每日经济新闻', url: 'https://www.jiemian.com/article/5441814.html' },
      { title: '澎湃政务号（2023）', url: 'https://m.thepaper.cn/newsDetail_forward_21882586' },
    ],
  },
  {
    name: '大堡礁“世界上最好的工作”',
    stamp: '旅游营销',
    text: '2009 年，英国人本·索撒尔从 3.4 万名申请者里胜出，在大堡礁待了六个月，任务是四处体验、写博客，替当地旅游做宣传。他后来说，这份工作该叫“世界上最忙的工作”。任期快结束时，他还被伊鲁坎吉水母蜇伤了。',
    refs: [
      { title: 'BBC News（2012）', url: 'https://www.bbc.com/news/uk-england-17690978' },
      { title: 'The Telegraph（2009）', url: 'https://www.telegraph.co.uk/news/worldnews/australiaandthepacific/australia/6908998/Best-Job-in-World-winner-Ben-Southall-stung-by-deadly-jellyfish.html' },
    ],
  },
  {
    name: '“躺着赚钱”的航天卧床志愿者',
    stamp: '是实验',
    text: '实验是真的，但它不是一份职业。“地星二号”实验里，36 名男性志愿者头朝下 6 度卧床 90 天，吃喝拉撒都在床上（2019）。2026 年招募的“地星三号”，卧床约 15 天或 30 天，最长不超过 60 天，全程完成可以拿到 2 万到 7 万元补助。',
    refs: [
      { title: '中国载人航天官方网站（2019）', url: 'https://www.cmse.gov.cn/xwzx/zhxw/201910/t20191018_22626.html' },
      { title: '科技日报（2026）', url: 'https://www.stdaily.com/web/gdxw/2026-05/08/content_513660.html' },
    ],
  },
  {
    name: 'NASA“行星保护官”',
    stamp: '误读',
    text: '2017 年美国国家航空航天局的一则招聘，被一些媒体写成“招人保护地球不受外星人侵害”。Snopes 核查后说明，这个岗位的大部分工作是防止探测任务把地球上的生命带到别的星球上去。',
    refs: [{ title: 'Snopes（2017）', url: 'https://www.snopes.com/fact-check/nasa-planetary-protection-officer/' }],
  },
];

export interface Note {
  name: string;
  text: string;
  refs: Ref[];
}

export const VANISHING: Note[] = [
  {
    name: '高速公路省界收费员',
    text: '2020 年 1 月 1 日起，全国 487 个省界收费站全部取消，1.2 万名收费员转岗。',
    refs: [{ title: '中国新闻网（2020）', url: 'https://www.xinhuanet.com/politics/2020-01/01/c_1125410710.htm' }],
  },
  {
    name: '抄表工',
    text: '智能电表全覆盖之后，南方电网的 2.1 万名抄表员转岗，“索道抄表工”成为历史（2018）。',
    refs: [{ title: '中国南方电网（2018）', url: 'http://www.sasac.gov.cn/n2588025/n2588124/c10107591/content.html' }],
  },
  {
    name: '长江渔民',
    text: '2021 年 1 月 1 日起长江十年禁渔，退捕渔船 11.1 万艘，渔民 23.1 万人。',
    refs: [
      { title: '农业农村部（2020）', url: 'https://cjyzbgs.moa.gov.cn/tpxw/202012/t20201215_6358390.htm' },
      { title: '中国政府网（2024）', url: 'https://www.gov.cn/zccfh/2024zccfh/20240402/wzsl/' },
    ],
  },
  {
    name: '象牙雕刻师',
    text: '2017 年底前全面停止商业性象牙加工销售，34 家加工单位、143 处销售场所分两批停业。',
    refs: [
      { title: '国务院办公厅通知（2016）', url: 'https://www.gov.cn/zhengce/content/2016-12/30/content_5155017.htm' },
      { title: '新华网（2018）', url: 'https://www.xinhuanet.com/politics/2018-01/02/c_1122197436.htm' },
    ],
  },
  {
    name: '新疆采棉工',
    text: '新疆棉花的机采率已在 90% 以上（2025）。兵团的季节性采棉工从 2008 年的 68.6 万人降到 2015 年的 14.29 万人。',
    refs: [
      { title: '新华社（2025）', url: 'https://www.news.cn/20251001/f067ebccfcde4cdd97ee36bbc307ba1e/c.html' },
      { title: '新疆日报（2023）', url: 'https://www.ts.cn/xwzx/shxw/202310/t20231025_16900321.shtml' },
    ],
  },
  {
    name: '收购员、平炉炼钢工、凸版制版工……',
    text: '2015 年版《职业分类大典》一次取消了 894 个职业。',
    refs: [{ title: '央广网（2015）', url: 'http://news.cntv.cn/2015/08/05/ARTI1438763702256295.shtml' }],
  },
];

export const EMERGING: Note[] = [
  {
    name: '2024 年',
    text: '滑雪巡救员成为新职业，老年助浴员、造雪师成为新工种。',
    refs: [{ title: '人社部通知附件（2024）', url: 'https://www.gov.cn/zhengce/zhengceku/202407/P020240731502013926154.pdf' }],
  },
  {
    name: '2025 年',
    text: '无人机群飞行规划员成为新职业，睡眠健康管理师、服务犬驯养师、旅拍定制师成为新工种。',
    refs: [
      { title: '新华社（2025）', url: 'https://www.gov.cn/lianbo/bumen/202507/content_7033240.htm' },
      { title: '新华网（2025）', url: 'https://www.xinhuanet.com/edu/20250722/875f221f084f47c0a9790d75f26d73a6/c.html' },
    ],
  },
  {
    name: '2026 年',
    text: '具身智能机器人应用技术员、制香香艺师成为新职业，机场净空巡查员、低空物流员、智能体开发员成为新工种。',
    refs: [{ title: '“就业在北京”（2026）', url: 'https://tyjrswj.beijing.gov.cn/fwzl/jycy/202609/t20260911_4859156.html' }],
  },
  {
    name: '总账',
    text: '2019 年以来一共发布了 8 批 121 个新职业；2022 年版《职业分类大典》共收 1639 个职业。',
    refs: [
      { title: '新华社（2026）', url: 'http://www.xinhuanet.com/20260909/0e0b0cdb616848ce81e3658078d46d3f/c.html' },
      { title: '央视新闻（2022）', url: 'https://www.news.cn/2022-09/28/c_1129038274.htm' },
    ],
  },
  {
    name: '一个提醒',
    text: '认定的年份不等于出现的年份。滑雪场的巡逻队 2022 年就上过《人民日报》，两年后才有了正式的职业名。',
    refs: [{ title: '人民日报（2022）', url: 'http://paper.people.com.cn/rmrbwap/html/2022-01/17/nw.D110000renmrb_20220117_1-15.htm' }],
  },
];

export interface Candidate {
  name: string;
  hook: string;
  ref: Ref;
}

export const BACKLOG: Candidate[] = [
  {
    name: '文物钟表修复师',
    hook: '故宫藏钟表 1500 余件，从事修复的专业人员只有 7 人。',
    ref: { title: '故宫博物院', url: 'https://www.dpm.org.cn/topic/party_building/good/detail/255713.html' },
  },
  {
    name: '深海潜航员',
    hook: '2013 年选拔学员时限身高：男 165–176 厘米，女 160–170 厘米。“蛟龙”号的载人舱内径只有 2.1 米，要容下三个人。',
    ref: { title: '新华社', url: 'https://www.gov.cn/jrzg/2013-09/16/content_2489677.htm' },
  },
  {
    name: '水下考古队员',
    hook: '内地持证的水下考古队员只有 196 人（2025）。',
    ref: { title: '中国日报双语新闻', url: 'https://news.qq.com/rain/a/20251218A06RZZ00' },
  },
  {
    name: '模拟画像师',
    hook: '一位画像师经手 1.1 万多起案件，却说“90%的案子是没法通过画像破案的”。',
    ref: { title: '上观新闻', url: 'https://www.shobserver.cn/wx/detail.do?id=79509' },
  },
  {
    name: '亚洲象监测员',
    hook: '“我们的上班时间？得看野象的心情。”',
    ref: { title: '新华每日电讯', url: 'http://yn.xinhuanet.com/20250814/dee2c98bbf644b0aa70e8e438dbee8f5/c.html' },
  },
  {
    name: '种子采集员',
    hook: '一份样本至少 2500 粒，采集量又不能超过原产地种子的 20%。',
    ref: { title: '人民日报', url: 'http://yn.people.com.cn/n2/2020/0227/c378439-33831396.html' },
  },
  {
    name: '考古探工',
    hook: '洛阳铲带上来的若是“五花土”，下边多半是墓。',
    ref: { title: '新华每日电讯', url: 'https://cssn.cn/kgxc/kgxc_kgsb/202303/t20230328_5616519.shtml' },
  },
  {
    name: '酒体设计师',
    hook: '不吃辛辣、不化妆，连桌上的砂糖橘都不碰，怕果皮味沾手。',
    ref: { title: '川观新闻', url: 'https://cbgc.scol.com.cn/news/7272975' },
  },
  {
    name: '无人机群飞行规划员',
    hook: '一场无人机表演，背后是一支 5 人左右的团队。',
    ref: { title: '人民日报海外版', url: 'https://paper.people.com.cn/rmrbhwb/pc/content/202508/29/content_30100925.html' },
  },
  {
    name: '遗体火化师',
    hook: '每具遗体都要按性别、年龄、体重、死亡原因和冷藏时间定方案。',
    ref: { title: '新京报', url: 'https://m.bjnews.com.cn/detail/164916936214969.html' },
  },
  {
    name: '大熊猫野化培训师',
    hook: '进培训圈要穿“熊猫服”，衣服上喷了熊猫粪便和尿液的提取物，用来盖住人的气味。',
    ref: { title: '人民日报', url: 'http://www.news.cn/politics/2023-10/12/c_1129911745.htm' },
  },
  {
    name: '采冰人',
    hook: '哈尔滨冰雪大世界的冰主要从松花江里采，一个采冰期约 20 天。',
    ref: { title: '新华社', url: 'http://www.xinhuanet.com/politics/2019-12/07/c_1125320158.htm' },
  },
  {
    name: '珊瑚养护员',
    hook: '“我的工位在海底”。三亚蜈支洲岛有一支三个人的小队，专门在海里种珊瑚。',
    ref: { title: '人民日报', url: 'https://www.sanya.gov.cn/sanyasite/mtksy/202602/21cc9ccefa1e44e392a472de8d507854.shtml' },
  },
  {
    name: '电影修复师',
    hook: '逐帧修。十几分钟的《劳工之爱情》修了将近一年。',
    ref: { title: '《瞭望》新闻周刊', url: 'http://lw.news.cn/2021-10/19/c_1310254662.htm' },
  },
  {
    name: '烟花设计师',
    hook: '彩排等于提前放一场，所以一般不排，改用软件模拟，让电流提前“跑”一遍。',
    ref: { title: '现代快报', url: 'https://szb.xdplus.cn/xdkb/pc/content/202410/24/content_50498.html' },
  },
  {
    name: '义眼师',
    hook: '义眼“是一笔一笔画出来的”，眼角的粉色过渡和血丝都要画上去。',
    ref: { title: '澎湃号·湃客', url: 'https://www.thepaper.cn/newsDetail_forward_22632466' },
  },
  {
    name: '高空气象观测员',
    hook: '西安泾河站每天 1:15、7:15、19:15 三次放探空气球，全年 365 天不能断。',
    ref: { title: '中国气象局网站', url: 'https://www.cma.gov.cn/2011xwzx/2011xmtjj/202301/t20230123_5277593.html' },
  },
  {
    name: '长城保护员',
    hook: '全国 7481 名（2026），沿着长城一段一段地巡护。',
    ref: { title: '中新网', url: 'https://www.chinanews.com.cn/sh/2026/11-07/10727960.shtml' },
  },
  {
    name: '鸟类环志员',
    hook: '凌晨两点在颐和园集合，布网、测量，给 107 只北京雨燕戴上金属环。',
    ref: { title: '人民日报', url: 'http://env.people.com.cn/n1/2025/0623/c1010-40506211.html' },
  },
  {
    name: '乐高专业认证大师',
    hook: '以拼乐高为业，全球只有 21 位（2023）。',
    ref: { title: 'How-To Geek', url: 'https://www.howtogeek.com/158134/could-you-become-a-lego-certified-professional/' },
  },
  {
    name: '滑雪巡救员',
    hook: '一家雪场的 51 名巡救员，每 18 分钟把主雪道巡一遍。',
    ref: { title: '新华社', url: 'https://www.news.cn/fortune/20250420/acf1bf0cc0c54c6f91de3eb9fc228aa8/c.html' },
  },
  {
    name: '白蚁防治工',
    hook: '在堤坝上找蚁巢先找蘑菇：找到鸡枞菌，巢区就在它下方。',
    ref: { title: '河南省地方标准 DB41/T 1761—2024', url: 'http://www.hnsky.org.cn/upfile/202411/2024112855440377.pdf' },
  },
];
