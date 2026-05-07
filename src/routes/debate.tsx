import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { debate } from "@/data/mockData";
import { thinkers } from "@/data/thinkers";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/debate")({
  head: () => ({
    meta: [
      { title: "Debate Room · 思想辩论厅 — Mind Agora" },
      { name: "description", content: "One question. Many minds. Different ways of seeing." },
      { property: "og:title", content: "Debate Room · Mind Agora" },
      { property: "og:description", content: "One question. Many minds. 一个问题，多种思想。" },
    ],
  }),
  component: DebatePage,
});

function tone(id: string) {
  const t = thinkers.find((x) => x.id === id);
  if (!t) return "bg-muted";
  if (t.tone === "sage") return "bg-[var(--sage)]/15";
  if (t.tone === "gold") return "bg-[var(--gold)]/20";
  return "bg-[var(--mist)]/40";
}

function Turn({ entry }: { entry: { thinkerId: string; en: string; zh: string } }) {
  const t = thinkers.find((x) => x.id === entry.thinkerId)!;
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-full font-serif", tone(t.id))}>{t.initial}</div>
        <div className="leading-tight">
          <div className="font-serif text-sm">{t.en}</div>
          <div className="zh text-[11px] text-muted-foreground">{t.zh}</div>
        </div>
      </div>
      <p className="mt-3 font-serif text-base leading-relaxed">{entry.en}</p>
      <p className="zh mt-1.5 text-xs leading-loose text-muted-foreground">{entry.zh}</p>
    </div>
  );
}

function Section({ titleEn, titleZh, items }: { titleEn: string; titleZh: string; items: typeof debate.opening }) {
  return (
    <section>
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="font-serif text-xl">{titleEn}</h2>
        <span className="zh text-sm text-muted-foreground">{titleZh}</span>
        <div className="ml-2 h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((e, i) => <Turn key={i} entry={e} />)}
      </div>
    </section>
  );
}

function DebatePage() {
  const { saveQuote, savedQuotes } = useAgora();
  const sideQuotes = [
    { id: "deb-1", text: debate.opening[1].en, textZh: debate.opening[1].zh, source: "Nietzsche" },
    { id: "deb-2", text: debate.opening[2].en, textZh: debate.opening[2].zh, source: "Virginia Woolf" },
    { id: "deb-3", text: debate.summary.en, textZh: debate.summary.zh, source: "Reflection Summary" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <BiText en="Debate Room" zh="思想辩论厅" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">One question. Many minds. Different ways of seeing.</p>
      <p className="zh text-sm text-muted-foreground/80">一个问题，多种思想，不同的观看方式。</p>

      <div className="mt-8 rounded-2xl border border-border bg-card/60 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Question · 问题</div>
        <div className="mt-2 font-serif text-xl">{debate.question.en}</div>
        <div className="zh mt-1 text-sm text-muted-foreground">{debate.question.zh}</div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-12">
          <Section titleEn="Opening Statements" titleZh="开场观点" items={debate.opening} />
          <Section titleEn="Responses" titleZh="回应" items={debate.responses} />
          <section>
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className="font-serif text-xl">Reflection Summary</h2>
              <span className="zh text-sm text-muted-foreground">反思总结</span>
              <div className="ml-2 h-px flex-1 bg-border" />
            </div>
            <div className="rounded-2xl border border-border bg-[var(--cream)] p-6 shadow-[var(--shadow-soft)]">
              <p className="font-serif text-lg leading-relaxed">{debate.summary.en}</p>
              <p className="zh mt-2 text-sm leading-loose text-muted-foreground">{debate.summary.zh}</p>
            </div>
          </section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-24 lg:h-fit">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Quotes you may want to save</div>
          <div className="zh text-xs text-muted-foreground/80">你可能想收藏的句子</div>
          {sideQuotes.map((q) => {
            const saved = savedQuotes.some((x) => x.id === q.id);
            return (
              <button
                key={q.id}
                onClick={() => {
                  if (saved) return;
                  saveQuote({ id: q.id, text: q.text, textZh: q.textZh, source: q.source, origin: "debate" });
                  toast.success("Saved · 已收藏");
                }}
                className={cn(
                  "w-full rounded-xl border p-3 text-left text-xs transition-all hover:-translate-y-0.5",
                  saved ? "border-[var(--sage)] bg-[var(--sage)]/10" : "border-border bg-card/70"
                )}
              >
                <div className="flex items-start gap-2">
                  {saved ? <BookmarkCheck className="mt-0.5 h-3.5 w-3.5 text-[color:var(--ink)]" /> : <Bookmark className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />}
                  <div>
                    <div className="font-serif text-sm leading-snug">{q.text}</div>
                    <div className="zh mt-1 text-[10px] leading-relaxed text-muted-foreground">{q.textZh}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">— {q.source}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
