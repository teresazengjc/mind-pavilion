import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, FileText, Bookmark, Share2, MoreHorizontal, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { meetings } from "@/data/feedData";
import { thinkers } from "@/data/thinkers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meetings · 会面 — Mind Agora" },
      { name: "description", content: "Each question opens a door. Return to the conversations you've begun." },
    ],
  }),
  component: MeetingsPage,
});

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/22 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/30 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/55 text-[color:var(--ink)]";
}

const statusStyle: Record<string, string> = {
  active: "bg-[var(--sage)]/25 text-[color:var(--ink)]",
  paused: "bg-[var(--gold)]/25 text-[color:var(--ink)]",
  complete: "bg-muted text-muted-foreground",
};

function MeetingsPage() {
  return (
    <div className="pb-6">
      <PageHeader en="Meetings" zh="会面" />

      {/* Hero */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border p-5 shadow-[var(--shadow-paper)]" style={{ background: "var(--gradient-soft)" }}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-b-full border border-white/40 opacity-50" />
          <div className="pointer-events-none absolute right-2 top-2 h-28 w-28 rounded-b-full bg-white/30" />
          <div className="relative">
            <Sparkles className="h-4 w-4 text-primary/80" />
            <h2 className="mt-2 font-serif text-[22px] leading-snug">Every question opens a door.</h2>
            <p className="zh mt-1 text-[12px] text-muted-foreground">每一个问题，都开启一扇门。</p>
            <Link to="/" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[12px] text-primary-foreground">
              Open a new door <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="mt-5 -mx-1 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {["All · 全部", "In progress · 进行中", "Paused · 暂停", "Closed · 已结"].map((f, i) => (
          <button
            key={f}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] transition-all",
              i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Meeting cards */}
      <section className="mt-4 grid gap-3 px-5">
        {meetings.map((m) => (
          <article key={m.id} className="group rounded-3xl border border-border bg-card/80 p-5 shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider", statusStyle[m.status])}>
                    {m.statusEn}
                  </span>
                  <span className="text-[10px] text-muted-foreground">· {m.updated}</span>
                </div>
                <h3 className="mt-2 font-serif text-[17px] leading-tight">{m.en}</h3>
                <p className="zh mt-1 text-[12px] text-muted-foreground">{m.zh}</p>
              </div>
              <button className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-accent">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Thinkers */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {m.thinkers.map((id) => {
                  const t = thinkers.find((x) => x.id === id);
                  if (!t) return null;
                  return (
                    <div key={id} className={cn("flex h-7 w-7 items-center justify-center rounded-full border-2 border-card font-serif text-[11px]", toneBg(t.tone))}>
                      {t.initial}
                    </div>
                  );
                })}
              </div>
              <span className="text-[11px] text-muted-foreground">{m.thinkers.length} voices · 个声音</span>
            </div>

            {/* Last insight */}
            <div className="mt-3 rounded-2xl border border-border/60 bg-background/50 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Last insight · 上一个洞见</div>
              <p className="mt-1 font-serif text-[13.5px] leading-snug">"{m.insight}"</p>
              <p className="zh mt-1 text-[11px] leading-relaxed text-muted-foreground">"{m.insightZh}"</p>
            </div>

            {/* Next suggested */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/8 px-3 py-2">
              <div className="text-[11.5px]">
                <span className="text-muted-foreground">Next: </span>
                <span className="font-medium text-foreground">{m.next}</span>
                <span className="zh ml-1 text-[10.5px] text-muted-foreground">· {m.nextZh}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
            </div>

            {/* Actions */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Link to="/great-minds" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] text-primary-foreground">
                <Play className="h-3 w-3" /> Resume <span className="zh opacity-80">继续</span>
              </Link>
              <button className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] hover:bg-accent">
                <FileText className="h-3 w-3" /> Summarize
              </button>
              <button className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] hover:bg-accent">
                <Bookmark className="h-3 w-3" /> Save quotes
              </button>
              <button className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] hover:bg-accent">
                <Share2 className="h-3 w-3" /> Share
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
