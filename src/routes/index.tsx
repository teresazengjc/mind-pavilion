import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Users, Quote as QuoteIcon, BookHeart } from "lucide-react";
import { BiText } from "@/components/common/BiText";
import { PavilionMark } from "@/components/common/PavilionMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "问思阁 | Mind Agora — Where your questions meet great minds" },
      { name: "description", content: "A quiet digital pavilion to think with philosophers, writers, artists, and scientists. Build your personal book of thought." },
      { property: "og:title", content: "问思阁 | Mind Agora" },
      { property: "og:description", content: "Where your questions meet great minds. 让你的问题与伟大思想相遇。" },
    ],
  }),
  component: Landing,
});

const features = [
  { to: "/great-minds", icon: MessageCircle, en: "Great Minds Chat", zh: "与巨人对话", descEn: "Talk with philosophers, writers, artists, and scientists.", descZh: "与哲学家、作家、艺术家和科学家对话。" },
  { to: "/debate", icon: Users, en: "Debate Room", zh: "思想辩论厅", descEn: "Watch great minds discuss one question from different perspectives.", descZh: "观看不同思想人物从多个角度讨论同一个问题。" },
  { to: "/quotes", icon: QuoteIcon, en: "Quote Mode", zh: "原著引用模式", descEn: "Receive answers grounded in original quotes from books and texts.", descZh: "通过书籍与文本中的原句获得回应。" },
  { to: "/thought-book", icon: BookHeart, en: "My Thought Book", zh: "我的思想之书", descEn: "Save quotes, write reflections, and build your personal book of thought.", descZh: "收藏句子，写下反思，建立属于自己的思想之书。" },
] as const;

function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-pavilion)" }} />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <PavilionMark className="text-primary/70" size={20} /> A quiet digital pavilion
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
              Where your questions <br />meet great minds.
            </h1>
            <p className="zh mt-4 text-xl text-muted-foreground">让你的问题与伟大思想相遇。</p>
            <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>Bring your inner questions into a quiet space of great minds. Talk with philosophers, writers, artists, and scientists. Collect meaningful quotes, write your own reflections, and build your personal book of thought.</p>
              <p className="zh text-[13px] leading-loose">把你心中的问题带入一个安静的思想空间。与哲学家、作家、艺术家和科学家对话。收藏有意义的句子，写下自己的反思，并建立一本属于自己的思想之书。</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/great-minds" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:translate-y-[-1px]">
                <PavilionMark size={18} /> Enter the Pavilion
                <span className="zh text-xs opacity-80">进入问思阁</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/ask" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm text-foreground backdrop-blur transition-all hover:bg-card">
                <MessageCircle className="h-4 w-4" /> Start with a Question
                <span className="zh text-xs text-muted-foreground">从一个问题开始</span>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem]" style={{ background: "var(--gradient-soft)", boxShadow: "var(--shadow-paper)" }} />
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-10 text-primary/40">
              <path d="M80 320 Q200 60 320 320" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M120 320 L120 200 Q200 140 280 200 L280 320" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="200" cy="160" r="24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="60" y1="340" x2="340" y2="340" stroke="currentColor" strokeWidth="1" />
              <line x1="40" y1="360" x2="360" y2="360" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
              <path d="M50 380 Q200 360 350 380" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            </svg>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <div className="font-serif text-sm text-primary/70">问思阁</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Mind Agora</div>
            </div>
          </div>
        </div>
      </section>

      {/* Distinction */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="font-serif text-2xl text-foreground md:text-3xl">Not another reading app. Not another chatbot.</p>
        <p className="zh mt-2 text-base text-muted-foreground">不是另一个读书软件，也不是另一个聊天机器人。</p>
        <p className="mt-6 text-base text-muted-foreground">Reading apps start from books. Mind Agora starts from your questions.</p>
        <p className="zh mt-1 text-sm text-muted-foreground/80">读书软件从书开始。问思阁从你的问题开始。</p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <BiText en={f.en} zh={f.zh} as="h3" serif className="text-lg" />
              <p className="text-sm text-muted-foreground">{f.descEn}</p>
              <p className="zh text-xs text-muted-foreground/80">{f.descZh}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
