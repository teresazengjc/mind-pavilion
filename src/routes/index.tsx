import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MessageCircle, BookOpen, Users, Bookmark, UserCircle2, Flame, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { thinkers } from "@/data/thinkers";
import { hotQuestions, debateTopics, readingPaths } from "@/data/feedData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "问思前人 · Great Minds — Mind Agora" },
      { name: "description", content: "Bring your questions into a quiet pavilion of great minds." },
      { property: "og:title", content: "问思前人 · Mind Agora" },
    ],
  }),
  component: HomePage,
});

const quickEntries = [
  { to: "/great-minds", icon: MessageCircle, en: "AI Great Minds Chat", zh: "AI 前人对话", tone: "mist" },
  { to: "/quotes", icon: BookOpen, en: "Original Text Dialogue", zh: "前人原文", tone: "sage" },
  { to: "/debate", icon: Users, en: "Debate Room", zh: "前人辩论室", tone: "gold" },
  { to: "/library", icon: Bookmark, en: "Saved Quotes", zh: "前人金句", tone: "mist" },
  { to: "/great-minds", icon: UserCircle2, en: "Thinker Profile", zh: "前人画像", tone: "sage" },
] as const;

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/20 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/22 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/45 text-[color:var(--ink)]";
}

function HomePage() {
  return (
    <div>
      <PageHeader en="Great Minds" zh="问思前人" subtitleEn="Where your questions meet great minds." subtitleZh="让你的问题与伟大思想相遇。" />

      {/* Search */}
      <div className="px-5">
        <Link
          to="/ask"
          className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/80 px-4 py-3.5 shadow-[var(--shadow-soft)] transition-all hover:bg-card"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 truncate text-[13px] text-muted-foreground">
            What is on your mind today?
            <span className="zh ml-1.5 text-muted-foreground/70">今天想问什么？</span>
          </div>
          <Sparkles className="h-4 w-4 text-primary/70" />
        </Link>
      </div>

      {/* Quick entries */}
      <section className="mt-5 px-5">
        <div className="grid grid-cols-3 gap-2.5">
          {quickEntries.slice(0, 3).map((q) => (
            <Link
              key={q.en}
              to={q.to}
              className="flex aspect-square flex-col items-start justify-between rounded-2xl border border-border bg-card/70 p-3 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", toneBg(q.tone))}>
                <q.icon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="text-[11px] font-medium leading-tight">{q.en}</div>
                <div className="zh mt-0.5 text-[10px] leading-tight text-muted-foreground">{q.zh}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {quickEntries.slice(3).map((q) => (
            <Link
              key={q.en}
              to={q.to}
              className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/70 p-3 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", toneBg(q.tone))}>
                <q.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium">{q.en}</div>
                <div className="zh truncate text-[10px] text-muted-foreground">{q.zh}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Thinker carousel */}
      <section className="mt-7">
        <SectionTitle en="Recommended Thinkers" zh="前人推荐" />
        <div className="-mx-1 mt-3 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {thinkers.map((t) => (
            <Link
              key={t.id}
              to="/great-minds"
              className="group flex w-[150px] shrink-0 flex-col gap-2 rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl", toneBg(t.tone))}>
                {t.initial}
              </div>
              <div>
                <div className="font-serif text-[15px] leading-tight">{t.en}</div>
                <div className="zh text-[11px] text-muted-foreground">{t.zh}</div>
              </div>
              <p className="line-clamp-2 text-[10.5px] leading-snug text-muted-foreground">{t.styleEn}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot questions */}
      <section className="mt-7 px-5">
        <SectionTitle en="Hot Questions" zh="热门问题" inline />
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card/70">
          {hotQuestions.map((q, i) => (
            <Link
              key={q.en}
              to="/ask"
              className="flex items-start gap-3 border-b border-border/60 px-4 py-3 last:border-0 transition-colors hover:bg-accent/30"
            >
              <div className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-serif text-[12px]",
                i < 3 ? "bg-[var(--gold)]/30 text-[color:var(--ink)]" : "bg-muted text-muted-foreground"
              )}>
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] leading-snug">{q.en}</div>
                <div className="zh mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{q.zh}</div>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                <Flame className="h-3 w-3" /> {q.count}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Debate ranking */}
      <section className="mt-7 px-5">
        <SectionTitle en="Debate Topics" zh="辩论话题" inline />
        <div className="mt-3 grid gap-2.5">
          {debateTopics.map((d) => (
            <Link
              key={d.en}
              to="/debate"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex shrink-0 -space-x-2">
                {d.thinkers.map((id) => {
                  const t = thinkers.find((x) => x.id === id);
                  if (!t) return null;
                  return (
                    <div key={id} className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2 border-card font-serif text-[12px]", toneBg(t.tone))}>
                      {t.initial}
                    </div>
                  );
                })}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium leading-tight">{d.en}</div>
                <div className="zh mt-0.5 text-[11px] leading-tight text-muted-foreground">{d.zh}</div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] text-[color:var(--ink)]">
                <Flame className="h-2.5 w-2.5" /> {d.heat}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reading paths */}
      <section className="mt-7 px-5">
        <SectionTitle en="Reading Paths" zh="阅读路径" inline />
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {readingPaths.map((p) => (
            <Link
              key={p.en}
              to="/reading-path"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className={cn("absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-50", toneBg(p.color))} />
              <div className="relative">
                <div className="font-serif text-[15px] leading-tight">{p.en}</div>
                <div className="zh mt-0.5 text-[11.5px] text-muted-foreground">{p.zh}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
                  {p.count} books · 本书 <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ en, zh, inline }: { en: string; zh: string; inline?: boolean }) {
  return (
    <div className={cn("flex items-baseline gap-2", !inline && "px-5")}>
      <h2 className="font-serif text-[17px]">{en}</h2>
      <span className="zh text-[12px] text-muted-foreground">{zh}</span>
    </div>
  );
}
