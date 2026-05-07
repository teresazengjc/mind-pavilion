export const hotQuestions = [
  { en: "How do I find meaning when nothing excites me?", zh: "当一切都无法激起我的兴趣时，如何寻找意义？", count: 2148 },
  { en: "Is solitude a gift or a punishment?", zh: "孤独是礼物还是惩罚？", count: 1872 },
  { en: "Can I love someone without losing myself?", zh: "我能否爱一个人而不失去自己？", count: 1650 },
  { en: "Why does success feel so empty?", zh: "为什么成功让人感到空虚？", count: 1432 },
  { en: "How should I live when time feels short?", zh: "当时间显得短暂时，我该如何生活？", count: 1198 },
];

export const debateTopics = [
  { en: "Stability vs Freedom", zh: "稳定 vs 自由", thinkers: ["confucius", "nietzsche"], heat: 96 },
  { en: "Solitude vs Community", zh: "孤独 vs 共同体", thinkers: ["rilke", "confucius"], heat: 88 },
  { en: "Reason vs Intuition", zh: "理性 vs 直觉", thinkers: ["socrates", "jung"], heat: 81 },
  { en: "Tradition vs Becoming", zh: "传统 vs 成为", thinkers: ["laozi", "beauvoir"], heat: 74 },
];

export const readingPaths = [
  { en: "Inner Calm", zh: "内在的平静", count: 6, color: "sage" },
  { en: "Becoming Yourself", zh: "成为自己", count: 8, color: "gold" },
  { en: "Living with Doubt", zh: "与怀疑共处", count: 5, color: "mist" },
  { en: "Love & Solitude", zh: "爱与孤独", count: 7, color: "sage" },
];

export const feedItems = [
  {
    id: "f1",
    user: { name: "Lin", handle: "@lin_quiet", initial: "L" },
    type: "quote" as const,
    time: "2h",
    en: "Live the questions now. Perhaps you will then gradually, without noticing it, live along some distant day into the answer.",
    zh: "现在，活在这些问题之中。也许有一天，你会不知不觉地活进答案里去。",
    source: "Rilke · Letters to a Young Poet",
    likes: 124,
    replies: 18,
  },
  {
    id: "f2",
    user: { name: "陈一念", handle: "@yinian", initial: "陈" },
    type: "thought" as const,
    time: "5h",
    en: "I am not lost. I am between versions of myself.",
    zh: "我不是迷路了。我只是正处在不同版本的自己之间。",
    likes: 88,
    replies: 12,
  },
  {
    id: "f3",
    user: { name: "Mira", handle: "@mira_reads", initial: "M" },
    type: "book" as const,
    time: "1d",
    en: "Reading Meditations again — Aurelius keeps me grounded when everything outside is loud.",
    zh: "重读《沉思录》——当外面的一切都很喧嚣时，奥勒留让我保持安定。",
    book: "Meditations · 沉思录",
    likes: 211,
    replies: 34,
  },
  {
    id: "f4",
    user: { name: "Kai", handle: "@kaisummer", initial: "K" },
    type: "debate" as const,
    time: "1d",
    en: "Watched Confucius and Nietzsche debate stability vs freedom. They didn't agree — but I left with a clearer question.",
    zh: "看了孔子和尼采就稳定与自由的辩论。他们没达成一致——但我带着一个更清晰的问题离开。",
    likes: 156,
    replies: 22,
  },
];

export const feedTabs = [
  { key: "rec", en: "Recommended", zh: "推荐" },
  { key: "follow", en: "Following", zh: "关注" },
  { key: "topic", en: "Topics", zh: "话题" },
  { key: "thinker", en: "Thinkers", zh: "前人" },
  { key: "mine", en: "Mine", zh: "我的" },
];
