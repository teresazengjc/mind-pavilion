import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, Mic, Flame, Sprout, Sun, Moon, Cloud, Users, MessagesSquare, Share2, ChevronRight } from "lucide-react";
import { thinkers } from "@/data/thinkers";
import { quickStartChips, moods, unfinishedQuestions, dailyPrompt, hotQuestions } from "@/data/feedData";
import { useAgora } from "@/store/useAgora";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mind Agora · 问思阁 — Where your questions meet great minds" },
      { name: "description", content: "A calm pavilion to think with great minds. Begin a new line of thought today." },
      { property: "og:title", content: "Mind Agora · 问思阁" },
    ],
  }),
  component: HomePage,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return { en: "Still awake", zh: "夜深了", icon: Moon };
  if (h < 12) return { en: "Good morning", zh: "早安", icon: Sun };
  if (h < 18) return { en: "Good afternoon", zh: "午安", icon: Cloud };
  return { en: "Good evening", zh: "晚安", icon: Moon };
}

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/25 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/30 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/55 text-[color:var(--ink)]";
}

function HomePage() {
  const g = greeting();
  const Icon = g.icon;
  const setQuestion = useAgora((s) => s.setQuestion);
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="pb-2">
      {/* Greeting */}
      <header className="px-5 pt-7 pb-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span className="text-[12px] uppercase tracking-[0.18em]">{g.en}</span>
          <span className="zh text-[11px] opacity-80">· {g.zh}</span>
        </div>
        <h1 className="mt-2 font-serif text-[28px] leading-tight">
          What would you like to <em className="not-italic text-primary">explore</em> today?
        </h1>
        <p className="zh mt-1 text-[12.5px] text-muted-foreground">今天，你想探索些什么？</p>
      </header>

      {/* Quick start chips */}
      <section className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {quickStartChips.map((c) => (
          <Link
            key={c.en}
            to="/ask"
            onClick={() => setQuestion(c.en, c.zh)}
            className="group shrink-0 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[12px] text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
          >
            <span className="mr-1 text-primary">·</span>
            {c.en}
            <span className="zh ml-1.5 text-[10.5px] text-muted-foreground">{c.zh}</span>
          </Link>
        ))}
      </section>

      {/* Hero — Begin a new line of thought */}
      <section className="mt-5 px-5">
        <Link
          to="/ask"
          className="group relative block overflow-hidden rounded-3xl border border-border p-5 shadow-[var(--shadow-paper)] transition-all hover:-translate-y-0.5"
          style={{ background: "var(--gradient-soft)" }}
        >
          {/* archway motif */}
          <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-b-full border border-white/40 opacity-60" />
          <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-b-full bg-white/30" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--ink)] backdrop-blur">
              <Sparkles className="h-3 w-3" /> Today
            </div>
            <h2 className="mt-3 font-serif text-[22px] leading-snug">Begin a new line of thought.</h2>
            <p className="zh mt-1 text-[12px] text-muted-foreground">开启一段新的思考</p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[12px] text-primary-foreground transition-all group-hover:translate-x-0.5">
                Ask <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-2 text-[11px] text-foreground/80">
                <Mic className="h-3.5 w-3.5" /> Speak <span className="zh opacity-70">语音</span>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Mood / focus selector */}
      <section className="mt-6 px-5">
        <div className="mb-2 flex items-baseline gap-2">
          <h3 className="font-serif text-[14px]">How do you want to think?</h3>
          <span className="zh text-[11px] text-muted-foreground">今天想以哪种方式思考</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((m) => {
            const active = mood === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMood(active ? null : m.key)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-[11px] transition-all",
                  active
                    ? "border-primary/50 bg-primary/8 -translate-y-0.5 shadow-[var(--shadow-soft)]"
                    : "border-border bg-card/60 hover:bg-card"
                )}
              >
                <div className={cn("flex h-7 w-7 items-center justify-center rounded-full font-serif text-[12px]", toneBg(m.tone))}>
                  {m.en[0]}
                </div>
                <span className="font-medium text-foreground/90">{m.en}</span>
                <span className="zh text-[10px] text-muted-foreground">{m.zh}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Carousel — Return to unfinished questions */}
      <section className="mt-7">
        <div className="flex items-baseline justify-between px-5">
          <div>
            <h3 className="font-serif text-[15px]">Return to unfinished questions</h3>
            <p className="zh text-[11px] text-muted-foreground">回到未完成的问题</p>
          </div>
          <Link to="/meetings" className="text-[11px] text-primary">All · 全部</Link>
        </div>
        <div className="mt-3 -mx-1 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {unfinishedQuestions.map((u) => (
            <Link
              key={u.id}
              to="/great-minds"
              className="group flex w-[240px] shrink-0 flex-col justify-between rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">With {u.thinker} · {u.lastAt}</div>
                <p className="mt-2 font-serif text-[15px] leading-snug">{u.en}</p>
                <p className="zh mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">{u.zh}</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-primary">
                Resume <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                <span className="zh ml-1 text-[10px] opacity-70">继续</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Your mind garden */}
      <section className="mt-7 px-5">
        <div className="mb-2 flex items-baseline gap-2">
          <Sprout className="h-4 w-4 text-[color:var(--sage)]" />
          <h3 className="font-serif text-[15px]">Your mind garden</h3>
          <span className="zh text-[11px] text-muted-foreground">你的心灵花园</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Link to="/self" className="rounded-2xl border border-border bg-card/70 p-3 transition-all hover:-translate-y-0.5">
            <div className="font-serif text-2xl">12</div>
            <div className="text-[11px] text-foreground/80">Questions</div>
            <div className="zh text-[10px] text-muted-foreground">问题</div>
          </Link>
          <Link to="/self" className="rounded-2xl border border-border bg-card/70 p-3 transition-all hover:-translate-y-0.5">
            <div className="font-serif text-2xl">38</div>
            <div className="text-[11px] text-foreground/80">Quotes</div>
            <div className="zh text-[10px] text-muted-foreground">金句</div>
          </Link>
          <Link to="/self" className="rounded-2xl border border-border bg-card/70 p-3 transition-all hover:-translate-y-0.5">
            <div className="font-serif text-2xl">7</div>
            <div className="text-[11px] text-foreground/80">Days</div>
            <div className="zh text-[10px] text-muted-foreground">天</div>
          </Link>
        </div>
      </section>

      {/* Daily prompt */}
      <section className="mt-6 px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border p-5" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 18%, var(--card)), var(--card))" }}>
          <div className="pointer-events-none absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/40" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Daily prompt · 每日一问</div>
            <p className="mt-2 font-serif text-[18px] leading-snug">"{dailyPrompt.en}"</p>
            <p className="zh mt-1.5 text-[12px] leading-loose text-muted-foreground">"{dailyPrompt.zh}"</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/ask" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] text-primary-foreground">
                Reflect now <span className="zh opacity-70">立即反思</span>
              </Link>
              <Link to="/circle" className="inline-flex items-center gap-1 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[11px]">
                <Share2 className="h-3 w-3" /> Share
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended thinkers */}
      <section className="mt-7">
        <div className="flex items-baseline justify-between px-5">
          <h3 className="font-serif text-[15px]">Voices to think with <span className="zh ml-1 text-[11px] text-muted-foreground">同行的声音</span></h3>
          <Link to="/great-minds" className="text-[11px] text-primary">All · 全部</Link>
        </div>
        <div className="mt-3 -mx-1 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {thinkers.map((t) => (
            <Link
              key={t.id}
              to="/great-minds"
              className="group flex w-[140px] shrink-0 flex-col gap-2 rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl", toneBg(t.tone))}>
                {t.initial}
              </div>
              <div>
                <div className="font-serif text-[14px] leading-tight">{t.en}</div>
                <div className="zh text-[11px] text-muted-foreground">{t.zh}</div>
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <MessagesSquare className="h-3 w-3" /> Talk
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot questions */}
      <section className="mt-7 px-5">
        <div className="mb-3 flex items-baseline gap-2">
          <Flame className="h-3.5 w-3.5 text-[color:var(--gold)]" />
          <h3 className="font-serif text-[15px]">What others are asking</h3>
          <span className="zh text-[11px] text-muted-foreground">他人正在问</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card/70">
          {hotQuestions.slice(0, 4).map((q, i) => (
            <Link
              key={q.en}
              to="/ask"
              onClick={() => setQuestion(q.en, q.zh)}
              className="group flex items-start gap-3 border-b border-border/50 px-4 py-3 last:border-0 transition-colors hover:bg-accent/30"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--gold)]/25 font-serif text-[12px] text-[color:var(--ink)]">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] leading-snug">{q.en}</div>
                <div className="zh mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{q.zh}</div>
              </div>
              <ChevronRight className="mt-1 h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer hint */}
      <section className="mt-7 px-5">
        <Link to="/circle" className="block rounded-2xl border border-dashed border-border bg-card/40 p-4 text-center text-[12px] text-muted-foreground hover:bg-card/70">
          <Users className="mr-1 inline h-3.5 w-3.5" />
          Visit Mind Circle · 走进思友圈
        </Link>
      </section>
    </div>
  );
}
