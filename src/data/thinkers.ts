export type Thinker = {
  id: string;
  en: string;
  zh: string;
  styleEn: string;
  styleZh: string;
  initial: string;
  tone: string;
};

export const thinkers: Thinker[] = [
  { id: "socrates", en: "Socrates", zh: "苏格拉底", styleEn: "Asks questions and guides self-reflection.", styleZh: "通过提问引导自我反思。", initial: "Σ", tone: "mist" },
  { id: "laozi", en: "Laozi", zh: "老子", styleEn: "Calm, simple, natural, non-forcing.", styleZh: "平静、简洁、自然、不强求。", initial: "道", tone: "sage" },
  { id: "nietzsche", en: "Nietzsche", zh: "尼采", styleEn: "Challenging, intense, self-overcoming.", styleZh: "挑战性、强烈、强调自我超越。", initial: "N", tone: "gold" },
  { id: "woolf", en: "Virginia Woolf", zh: "弗吉尼亚·伍尔夫", styleEn: "Poetic, sensitive, inward-looking.", styleZh: "诗意、敏感、关注内在。", initial: "V", tone: "mist" },
  { id: "jung", en: "Carl Jung", zh: "荣格", styleEn: "Psychological, symbolic, shadow and self.", styleZh: "心理学、象征、阴影与自我。", initial: "J", tone: "sage" },
  { id: "confucius", en: "Confucius", zh: "孔子", styleEn: "Relational, ethical, grounded in responsibility.", styleZh: "重视关系、伦理与责任。", initial: "孔", tone: "gold" },
  { id: "beauvoir", en: "Simone de Beauvoir", zh: "西蒙娜·德·波伏娃", styleEn: "Freedom, choice, identity, becoming.", styleZh: "自由、选择、身份与成为。", initial: "S", tone: "mist" },
  { id: "rilke", en: "Rilke", zh: "里尔克", styleEn: "Solitude, art, patience, inner growth.", styleZh: "孤独、艺术、耐心与内在成长。", initial: "R", tone: "sage" },
];
