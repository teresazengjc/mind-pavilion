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

export const quickStartChips = [
  { en: "Stability or freedom", zh: "稳定还是自由" },
  { en: "I feel lost", zh: "我感到迷茫" },
  { en: "Creative block", zh: "创作瓶颈" },
  { en: "Relationships", zh: "人际关系" },
  { en: "Meaning", zh: "意义" },
];

export const moods = [
  { key: "reflect", en: "Reflect", zh: "反思", tone: "mist" },
  { key: "debate", en: "Debate", zh: "辩论", tone: "gold" },
  { key: "read", en: "Read", zh: "阅读", tone: "sage" },
  { key: "share", en: "Share", zh: "分享", tone: "mist" },
];

export const unfinishedQuestions = [
  { id: "u1", en: "Why do I keep choosing comfort over growth?", zh: "为什么我总在舒适与成长之间选择前者？", thinker: "Nietzsche", lastAt: "yesterday" },
  { id: "u2", en: "What does it mean to belong to myself?", zh: "属于我自己，意味着什么？", thinker: "Woolf", lastAt: "3d ago" },
  { id: "u3", en: "Can I love without expectation?", zh: "我能不带期待地去爱吗？", thinker: "Rilke", lastAt: "1w ago" },
];

export const dailyPrompt = {
  en: "What is one truth you avoided saying today?",
  zh: "今天，你有哪一句真心话没有说出口？",
};

export const meetings = [
  {
    id: "m1",
    en: "Stability or freedom",
    zh: "稳定还是自由",
    status: "active",
    statusEn: "In progress",
    statusZh: "进行中",
    thinkers: ["confucius", "nietzsche", "woolf"],
    insight: "Perhaps the question is not stability or freedom, but what kind of inner room each choice allows.",
    insightZh: "也许问题不是稳定或自由，而是每一种选择允许你居住在怎样的内在房间里。",
    next: "Invite Laozi to join",
    nextZh: "邀请老子加入",
    updated: "2h",
  },
  {
    id: "m2",
    en: "Why does success feel empty?",
    zh: "为什么成功让人感到空虚？",
    status: "paused",
    statusEn: "Paused",
    statusZh: "暂停",
    thinkers: ["socrates", "jung"],
    insight: "Success is a mirror — it reflects back only what you brought into it.",
    insightZh: "成功是一面镜子——它只会映出你带进去的东西。",
    next: "Summarize so far",
    nextZh: "总结到此为止",
    updated: "yesterday",
  },
  {
    id: "m3",
    en: "Can solitude become a home?",
    zh: "孤独可以成为家吗？",
    status: "complete",
    statusEn: "Closed",
    statusZh: "已结",
    thinkers: ["rilke", "laozi"],
    insight: "Solitude becomes home the moment you stop trying to leave it.",
    insightZh: "当你不再试图离开它的那一刻，孤独便成了家。",
    next: "Save 3 quotes",
    nextZh: "收藏 3 句金句",
    updated: "3d",
  },
];

export const followups = [
  { en: "What would change if I trusted that?", zh: "如果我相信这一点，会有什么改变？" },
  { en: "Where did this belief begin?", zh: "这种信念是从哪里开始的？" },
  { en: "What am I afraid to lose?", zh: "我害怕失去什么？" },
];

export const themes = [
  { en: "Freedom", zh: "自由", weight: 92 },
  { en: "Belonging", zh: "归属", weight: 78 },
  { en: "Creativity", zh: "创造力", weight: 64 },
  { en: "Solitude", zh: "孤独", weight: 51 },
  { en: "Fear", zh: "恐惧", weight: 38 },
];

export const growingSignals = [
  { en: "You ask softer questions about love.", zh: "你对爱的提问越来越温柔。" },
  { en: "Your reflections are 32% longer than last month.", zh: "你的反思比上个月长了 32%。" },
  { en: "You return to Rilke more than any other voice.", zh: "你回到里尔克的次数超过任何一个声音。" },
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
  { key: "rec", en: "For You", zh: "推荐" },
  { key: "follow", en: "Following", zh: "关注" },
  { key: "questions", en: "Questions", zh: "问题" },
  { key: "quotes", en: "Quotes", zh: "金句" },
];

export const composeActions = [
  { key: "question", en: "Share a question", zh: "分享一个问题", tone: "mist" },
  { key: "quote", en: "Share a quote", zh: "分享一句金句", tone: "gold" },
  { key: "reflection", en: "Share a reflection", zh: "分享一段反思", tone: "sage" },
  { key: "book", en: "Share a book", zh: "分享一本书", tone: "mist" },
];
