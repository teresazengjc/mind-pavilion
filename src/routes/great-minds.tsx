import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, MessageCircle, Users } from "lucide-react";
import { toast } from "sonner";
import { thinkers } from "@/data/thinkers";
import { greatMindResponses } from "@/data/mockData";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/great-minds")({
  head: () => ({
    meta: [
      { title: "Great Minds Chat · 与巨人对话 — Mind Agora" },
      { name: "description", content: "Choose the minds you want to think with — from Socrates to Woolf, Laozi to Nietzsche." },
      { property: "og:title", content: "Great Minds Chat · Mind Agora" },
      { property: "og:description", content: "Choose the minds you want to think with. 选择你想一起思考的人。" },
    ],
  }),
  component: GreatMinds,
});

function toneClass(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/15 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/20 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/40 text-[color:var(--ink)]";
}

function GreatMinds() {
  const navigate = useNavigate();
  const { selectedThinkerIds, toggleThinker, currentQuestion, currentQuestionZh, saveQuote, savedQuotes } = useAgora();

  const isSaved = (id: string) => savedQuotes.some((q) => q.id === id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <BiText en="Great Minds Chat" zh="与巨人对话" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-4 text-base text-muted-foreground">Choose the minds you want to think with.</p>
      <p className="zh text-sm text-muted-foreground/80">选择你想一起思考的人。</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {thinkers.map((t) => {
          const selected = selectedThinkerIds.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => toggleThinker(t.id)}
              className={cn(
                "group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5",
                selected ? "border-[var(--sage)] bg-[var(--sage)]/10 shadow-[var(--shadow-soft)]" : "border-border bg-card/60"
              )}
            >
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-lg", toneClass(t.tone))}>
                {t.initial}
              </div>
              <div className="min-w-0">
                <div className="font-serif text-base text-foreground">{t.en}</div>
                <div className="zh text-xs text-muted-foreground">{t.zh}</div>
                <div className="mt-1.5 text-[11px] leading-snug text-muted-foreground/90">{t.styleEn}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Question banner */}
      <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your question · 你的问题</div>
        <div className="mt-2 font-serif text-xl text-foreground">{currentQuestion}</div>
        <div className="zh mt-1 text-sm text-muted-foreground">{currentQuestionZh}</div>
      </div>

      {/* Responses */}
      <div className="mt-8 space-y-5">
        {greatMindResponses.map((r) => {
          const t = thinkers.find((x) => x.id === r.thinkerId)!;
          const id = `mind-${t.id}`;
          const saved = isSaved(id);
          return (
            <div key={t.id} className="rounded-2xl border border-border bg-card/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full font-serif", toneClass(t.tone))}>{t.initial}</div>
                <div>
                  <div className="font-serif text-base">{t.en}</div>
                  <div className="zh text-xs text-muted-foreground">{t.zh}</div>
                </div>
              </div>
              <p className="mt-4 font-serif text-lg leading-relaxed text-foreground">{r.en}</p>
              <p className="zh mt-2 text-sm leading-loose text-muted-foreground">{r.zh}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    if (saved) return;
                    saveQuote({ id, text: r.en, textZh: r.zh, source: t.en, sourceZh: t.zh, origin: "mind" });
                    toast.success("Saved · 已收藏");
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs transition-all",
                    saved ? "border-[var(--sage)] bg-[var(--sage)]/15 text-foreground" : "border-border bg-card hover:bg-accent"
                  )}
                >
                  {saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                  {saved ? "Saved" : "Save Quote"}
                  <span className="zh opacity-70">{saved ? "已收藏" : "收藏句子"}</span>
                </button>
                <button
                  onClick={() => toast("More from " + t.en + " · 继续追问")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs hover:bg-accent"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Ask More <span className="zh opacity-70">继续追问</span>
                </button>
                <button
                  onClick={() => navigate({ to: "/debate" })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs hover:bg-accent"
                >
                  <Users className="h-3.5 w-3.5" /> Invite to Debate <span className="zh opacity-70">邀请进入辩论</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
