import { createFileRoute } from "@tanstack/react-router";
import { Calendar, BookHeart } from "lucide-react";
import { toast } from "sonner";
import { weekly } from "@/data/mockData";
import { BiText } from "@/components/common/BiText";

export const Route = createFileRoute("/reflection")({
  head: () => ({
    meta: [
      { title: "Weekly Reflection · 周反思 — Mind Agora" },
      { name: "description", content: "A map of what you have been thinking about this week." },
      { property: "og:title", content: "Weekly Reflection · Mind Agora" },
      { property: "og:description", content: "A map of what you have been thinking about. 你最近在思考什么。" },
    ],
  }),
  component: ReflectionPage,
});

function ReflectionPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <BiText en="Weekly Reflection" zh="周反思" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">A map of what you have been thinking about.</p>
      <p className="zh text-sm text-muted-foreground/80">一张关于你最近在思考什么的地图。</p>

      <div className="mt-10 grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Top themes this week</div>
          <div className="zh text-[11px] text-muted-foreground/80">本周高频主题</div>
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            {weekly.themes.map((t) => (
              <div key={t.en} className="rounded-full bg-[var(--mist)]/40 px-4 py-1.5" style={{ fontSize: 12 + t.weight * 2 }}>
                <span className="font-serif">{t.en}</span>
                <span className="zh ml-1.5 text-xs text-muted-foreground">{t.zh}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-[var(--cream)] p-5 shadow-[var(--shadow-soft)]">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Most saved mind</div>
            <div className="mt-2 font-serif text-2xl">{weekly.topMind.en}</div>
            <div className="zh text-sm text-muted-foreground">{weekly.topMind.zh}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Most saved quote</div>
            <p className="mt-2 font-serif text-base leading-snug">"{weekly.topQuote.en}"</p>
            <p className="zh mt-1 text-[11px] text-muted-foreground">"{weekly.topQuote.zh}"</p>
          </div>
        </div>
      </div>

      <div className="paper mt-8 rounded-2xl border border-border p-7 shadow-[var(--shadow-paper)]">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Suggested reflection · 建议的反思</div>
        <p className="mt-4 font-serif text-xl leading-relaxed">{weekly.reflection.en}</p>
        <p className="zh mt-3 text-sm leading-loose text-muted-foreground">{weekly.reflection.zh}</p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={() => toast("Monthly report queued · 月报生成中")} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary/90">
          <Calendar className="h-4 w-4" /> Generate Monthly Report <span className="zh text-xs opacity-80">生成月度报告</span>
        </button>
        <button onClick={() => toast("Added to Thought Book · 已加入思想之书")} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-accent">
          <BookHeart className="h-4 w-4" /> Add to Thought Book <span className="zh text-xs text-muted-foreground">加入思想之书</span>
        </button>
      </div>
    </div>
  );
}
