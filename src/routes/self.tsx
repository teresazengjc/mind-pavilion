import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, PenLine, Trees, Network, UserCircle2, BookHeart, ChevronRight, Settings } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAgora } from "@/store/useAgora";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/self")({
  head: () => ({
    meta: [
      { title: "自我问思 · Self — Mind Agora" },
      { name: "description", content: "Your questions, reflections, tree hole, mind map, and personal thought book." },
    ],
  }),
  component: SelfPage,
});

const cards = [
  { to: "/ask", icon: HelpCircle, en: "My Questions", zh: "我问过的问题", tone: "mist", key: "questions" },
  { to: "/thoughts", icon: PenLine, en: "My Reflections", zh: "我的输出创作", tone: "sage", key: "reflections" },
  { to: "/thoughts", icon: Trees, en: "My Tree Hole", zh: "我的树洞", tone: "gold", key: "treehole" },
  { to: "/reflection", icon: Network, en: "My Mind Map", zh: "我的分析图谱", tone: "mist", key: "map" },
  { to: "/reflection", icon: UserCircle2, en: "My Inquiry Profile", zh: "我的问思画像", tone: "sage", key: "profile" },
  { to: "/thought-book", icon: BookHeart, en: "My Thought Book", zh: "我的思想之书", tone: "gold", key: "book" },
] as const;

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/20 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/22 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/45 text-[color:var(--ink)]";
}

function SelfPage() {
  const savedQuotes = useAgora((s) => s.savedQuotes);
  const savedThoughts = useAgora((s) => s.savedThoughts);
  const readingList = useAgora((s) => s.readingList);

  const stats = [
    { en: "Quotes", zh: "金句", value: savedQuotes.length },
    { en: "Thoughts", zh: "思绪", value: savedThoughts.length },
    { en: "Books", zh: "书籍", value: readingList.length },
    { en: "Days", zh: "天", value: 12 },
  ];

  return (
    <div>
      <PageHeader en="Self" zh="自我问思" subtitleEn="Your inner pavilion." subtitleZh="你的内在阁楼。" />

      {/* Profile summary */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-5 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-soft)" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 font-serif text-2xl text-primary">
              问
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-serif text-[17px] leading-tight">A Quiet Inquirer</div>
              <div className="zh text-[12px] text-muted-foreground">一位安静的提问者</div>
              <div className="mt-1 text-[11px] text-muted-foreground/80">@you · joined this week · 本周加入</div>
            </div>
            <button className="rounded-full p-2 text-muted-foreground hover:bg-card">
              <Settings className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {stats.map((s) => (
              <div key={s.en} className="rounded-xl bg-background/50 p-2.5 text-center">
                <div className="font-serif text-lg leading-none">{s.value}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">{s.en}</div>
                <div className="zh text-[9.5px] text-muted-foreground/80">{s.zh}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* This week */}
      <section className="mt-6 px-5">
        <div className="rounded-2xl border border-border bg-card/70 p-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-serif text-[15px]">This Week's Reflection</div>
              <div className="zh text-[11px] text-muted-foreground">本周反思</div>
            </div>
            <Link to="/reflection" className="text-[11px] text-primary">View · 查看</Link>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
            Your questions moved between safety and expansion. You may not be choosing between stability and freedom, but searching for a structure that can hold your freedom.
          </p>
          <p className="zh mt-1.5 text-[11.5px] leading-loose text-muted-foreground/85">
            你的问题在安全感与扩展之间移动。你也许不是在二选一，而是在寻找一种能承载自由的结构。
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="mt-6 px-5">
        <div className="grid grid-cols-2 gap-2.5">
          {cards.map((c) => (
            <Link
              key={c.key}
              to={c.to}
              className="group relative flex flex-col gap-2 rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", toneBg(c.tone))}>
                <c.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="mt-1">
                <div className="text-[13px] font-medium leading-tight">{c.en}</div>
                <div className="zh mt-0.5 text-[11px] text-muted-foreground">{c.zh}</div>
              </div>
              <ChevronRight className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <Link to="/how-it-works" className="block rounded-2xl border border-dashed border-border bg-card/40 p-4 text-center text-[12px] text-muted-foreground hover:bg-card/70">
          How Mind Agora works · 问思阁如何运作
        </Link>
      </section>
    </div>
  );
}
