// themes-data.js — 月別テンプレートのテーマ定義（12月 × 4テンプレート = 48種）

// ── 月別テンプレート定義（各月固有の季節感） ──
const MONTH_TEMPLATES = {
  1: [
    { id: 'shogatsu',   label: '迎春',   cssClass: 'tpl-1-shogatsu' },
    { id: 'yukigeshiki', label: '雪景色', cssClass: 'tpl-1-yukigeshiki' },
    { id: 'fuyunoyoru', label: '冬の夜', cssClass: 'tpl-1-fuyunoyoru' },
    { id: 'hatsumoude', label: '初詣',   cssClass: 'tpl-1-hatsumoude' },
  ],
  2: [
    { id: 'valentine',  label: 'バレンタイン', cssClass: 'tpl-2-valentine' },
    { id: 'ume',        label: '梅の花',       cssClass: 'tpl-2-ume' },
    { id: 'chocolate',  label: 'ショコラ',     cssClass: 'tpl-2-chocolate' },
    { id: 'yukidoke',   label: '雪解け',       cssClass: 'tpl-2-yukidoke' },
  ],
  3: [
    { id: 'hinamatsuri', label: 'ひなまつり', cssClass: 'tpl-3-hinamatsuri' },
    { id: 'nanohana',    label: '菜の花',     cssClass: 'tpl-3-nanohana' },
    { id: 'harukaze',    label: '春風',       cssClass: 'tpl-3-harukaze' },
    { id: 'soushun',     label: '早春',       cssClass: 'tpl-3-soushun' },
  ],
  4: [
    { id: 'sakura',     label: '桜',       cssClass: 'tpl-4-sakura' },
    { id: 'shinryoku',  label: '新緑',     cssClass: 'tpl-4-shinryoku' },
    { id: 'hanami',     label: '花見',     cssClass: 'tpl-4-hanami' },
    { id: 'pastel',     label: 'パステル', cssClass: 'tpl-4-pastel' },
  ],
  5: [
    { id: 'shinryoku',   label: '深緑',     cssClass: 'tpl-5-shinryoku' },
    { id: 'koinobori',   label: 'こいのぼり', cssClass: 'tpl-5-koinobori' },
    { id: 'satsukibare', label: '五月晴れ',   cssClass: 'tpl-5-satsukibare' },
    { id: 'fuji',        label: '藤の花',     cssClass: 'tpl-5-fuji' },
  ],
  6: [
    { id: 'ajisai',  label: '紫陽花', cssClass: 'tpl-6-ajisai' },
    { id: 'amenohi', label: '雨の日', cssClass: 'tpl-6-amenohi' },
    { id: 'hotaru',  label: '蛍',     cssClass: 'tpl-6-hotaru' },
    { id: 'niji',    label: '虹',     cssClass: 'tpl-6-niji' },
  ],
  7: [
    { id: 'tanabata', label: '七夕',   cssClass: 'tpl-7-tanabata' },
    { id: 'himawari', label: '向日葵', cssClass: 'tpl-7-himawari' },
    { id: 'umi',      label: '海',     cssClass: 'tpl-7-umi' },
    { id: 'matsuri',  label: '夏祭り', cssClass: 'tpl-7-matsuri' },
  ],
  8: [
    { id: 'hanabi',   label: '花火',       cssClass: 'tpl-8-hanabi' },
    { id: 'tropical', label: 'トロピカル', cssClass: 'tpl-8-tropical' },
    { id: 'natsu',    label: '真夏日',     cssClass: 'tpl-8-natsu' },
    { id: 'suika',    label: 'スイカ',     cssClass: 'tpl-8-suika' },
  ],
  9: [
    { id: 'otsukimi',  label: 'お月見',   cssClass: 'tpl-9-otsukimi' },
    { id: 'cosmos',    label: '秋桜',     cssClass: 'tpl-9-cosmos' },
    { id: 'minori',    label: '実りの秋', cssClass: 'tpl-9-minori' },
    { id: 'higanbana', label: '彼岸花',   cssClass: 'tpl-9-higanbana' },
  ],
  10: [
    { id: 'halloween',  label: 'ハロウィン', cssClass: 'tpl-10-halloween' },
    { id: 'kouyou',     label: '紅葉',       cssClass: 'tpl-10-kouyou' },
    { id: 'akiminori',  label: '秋の実り',   cssClass: 'tpl-10-akiminori' },
    { id: 'juusanya',   label: '十三夜',     cssClass: 'tpl-10-juusanya' },
  ],
  11: [
    { id: 'momijigari',  label: '紅葉狩り', cssClass: 'tpl-11-momijigari' },
    { id: 'ochiba',      label: '落ち葉',   cssClass: 'tpl-11-ochiba' },
    { id: 'kogarashi',   label: '木枯らし', cssClass: 'tpl-11-kogarashi' },
    { id: 'shichigosan', label: '七五三',   cssClass: 'tpl-11-shichigosan' },
  ],
  12: [
    { id: 'christmas',   label: 'クリスマス', cssClass: 'tpl-12-christmas' },
    { id: 'fuyunomori',  label: '冬の森',     cssClass: 'tpl-12-fuyunomori' },
    { id: 'yukino',      label: '雪の結晶',   cssClass: 'tpl-12-yukino' },
    { id: 'toshikoshi',  label: '年越し',     cssClass: 'tpl-12-toshikoshi' },
  ],
};

// ── 月別カラーパレット ──
const MONTH_PALETTES = {
  1:  { nameEn: 'JANUARY',   primary: '#1a237e', secondary: '#283593', accent: '#d4af37', background: '#fafafa' },
  2:  { nameEn: 'FEBRUARY',  primary: '#5d1010', secondary: '#2c3e50', accent: '#c0392b', background: '#fffaf0' },
  3:  { nameEn: 'MARCH',     primary: '#880e4f', secondary: '#4a148c', accent: '#e91e63', background: '#fff8f8' },
  4:  { nameEn: 'APRIL',     primary: '#ad1457', secondary: '#6a1b9a', accent: '#ec407a', background: '#fff5f7' },
  5:  { nameEn: 'MAY',       primary: '#1b5e20', secondary: '#2e7d32', accent: '#43a047', background: '#f5fff5' },
  6:  { nameEn: 'JUNE',      primary: '#283593', secondary: '#3949ab', accent: '#5c6bc0', background: '#f5f5ff' },
  7:  { nameEn: 'JULY',      primary: '#01579b', secondary: '#0277bd', accent: '#0288d1', background: '#f0f9ff' },
  8:  { nameEn: 'AUGUST',    primary: '#e65100', secondary: '#bf360c', accent: '#ff6d00', background: '#fff8f0' },
  9:  { nameEn: 'SEPTEMBER', primary: '#4a148c', secondary: '#6a1b9a', accent: '#ab47bc', background: '#faf5ff' },
  10: { nameEn: 'OCTOBER',   primary: '#bf360c', secondary: '#d84315', accent: '#e64a19', background: '#fff5f0' },
  11: { nameEn: 'NOVEMBER',  primary: '#3e2723', secondary: '#4e342e', accent: '#795548', background: '#faf5f0' },
  12: { nameEn: 'DECEMBER',  primary: '#1b5e20', secondary: '#b71c1c', accent: '#c62828', background: '#f5fff5' },
};

// ── 月別イベントスタイル ──
const MONTH_EVENTS = {
  1: { newyear: { cellBg: 'rgba(212,175,55,0.05)', numberColor: '#d4af37', noteBg: '#fff8e1', noteColor: '#f57f17', noteBorder: '#ffecb3' } },
  2: {
    setsubun:  { cellBg: 'rgba(239,108,0,0.03)', numberColor: '#f39c12', noteBg: '#fff3e0', noteColor: '#e65100', noteBorder: '#ffe0b2' },
    risshun:   { cellBg: 'rgba(46,125,50,0.03)', numberColor: '#27ae60', noteBg: '#e8f5e9', noteColor: '#1b5e20', noteBorder: '#c8e6c9' },
    valentine: { cellBg: 'rgba(173,20,87,0.03)', numberColor: '#833471', noteBg: '#fce4ec', noteColor: '#880e4f', noteBorder: '#f8bbd0' },
  },
  3: { hinamatsuri: { cellBg: 'rgba(233,30,99,0.03)', numberColor: '#e91e63', noteBg: '#fce4ec', noteColor: '#880e4f', noteBorder: '#f8bbd0' } },
  5: { kodomonohi: { cellBg: 'rgba(67,160,71,0.04)', numberColor: '#2e7d32', noteBg: '#e8f5e9', noteColor: '#1b5e20', noteBorder: '#a5d6a7' } },
  7: { tanabata: { cellBg: 'rgba(2,136,209,0.04)', numberColor: '#0288d1', noteBg: '#e1f5fe', noteColor: '#01579b', noteBorder: '#81d4fa' } },
  10: { halloween: { cellBg: 'rgba(230,74,25,0.04)', numberColor: '#e64a19', noteBg: '#fff3e0', noteColor: '#bf360c', noteBorder: '#ffcc80' } },
  12: { christmas: { cellBg: 'rgba(198,40,40,0.04)', numberColor: '#c62828', noteBg: '#ffebee', noteColor: '#b71c1c', noteBorder: '#ef9a9a' } },
};

// ── アクセント画像（月別） ──
const MONTH_ACCENTS = {
  2: { image: 'assets/accents/february.png', opacityTop: 0.15, opacityBottom: 0.12 },
};
const DEFAULT_ACCENT = { image: '', opacityTop: 0, opacityBottom: 0 };

// ── テーマ組み立て ──
function buildTheme(month, template) {
  const palette = MONTH_PALETTES[month];
  return {
    id: `${month}-${template.id}`,
    month,
    template: template.id,
    templateLabel: template.label,
    cssClass: template.cssClass,
    name: `${month}月 - ${template.label}`,
    nameEn: palette.nameEn,
    colors: {
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      background: palette.background,
      border: '#dcdde1',
      text: '#2f3640',
      weekendSun: '#e84118',
      weekendSat: '#0097e6',
    },
    accent: MONTH_ACCENTS[month] || DEFAULT_ACCENT,
    eventStyles: MONTH_EVENTS[month] || {},
  };
}

// ── 全テーマ生成（12ヶ月 × 4テンプレート = 48テーマ） ──
export const THEMES = {};
export const THEMES_BY_MONTH = {};

for (let m = 1; m <= 12; m++) {
  THEMES_BY_MONTH[m] = [];
  for (const template of MONTH_TEMPLATES[m]) {
    const theme = buildTheme(m, template);
    THEMES[theme.id] = theme;
    THEMES_BY_MONTH[m].push(theme);
  }
}

export function getDefaultThemeId(month) {
  return MONTH_TEMPLATES[month][0]
    ? `${month}-${MONTH_TEMPLATES[month][0].id}`
    : `${month}-shogatsu`;
}

export function getThemesForMonth(month) {
  return THEMES_BY_MONTH[month] || [];
}

export const MONTH_NAMES_JP = [
  '', '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
];
