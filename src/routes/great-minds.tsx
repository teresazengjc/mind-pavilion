import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Bookmark, BookmarkCheck, MessageCircle, Users, ArrowRight, Sparkles, Plus, FileText, Repeat, Send } from "lucide-react";
import { toast } from "sonner";
import { thinkers } from "@/data/thinkers";
import { greatMindResponses } from "@/data/mockData";
import { followups } from "@/data/feedData";
import { useAgora } from "@/store/useAgora";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/great-minds")({
  head: () => ({
    meta: [
      { title: "Thinking Room · 思考室 — Mind Agora" },
      { name: "description", content: "An immersive room to think with great minds. Save insights, ask deeper, invite another voice." },
    ],
  }),
  component: ThinkingRoom,
});

function toneClass(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/22 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/30 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/55 text-[color:var(--ink)]";
}

function ThinkingRoom() {
  const { currentQuestion, currentQuestionZh, saveQuote, savedQuotes } = useAgora();
  const [active, setActive] = useState<string>(greatMindResponses[0].thinkerId);
  const [over, setOver] = useState(false);
  const [savedFlash, setSavedFlash] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const isSaved = (id: string) => savedQuotes.some((q) => q.id === id);
  const activeThinker = thinkers.find((t) => t.id === active);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setOver(false);
    const id = e.dataTransfer.getData("text/qid");
    const r = greatMindResponses.find((x) => x.thinkerId === id);
    const t = thinkers.find((x) => x.id === id);
    if (r && t && !isSaved(`mind-${id}`)) {
      saveQuote({ id: `mind-${id}`, text: r.en, textZh: r.zh, source: t.en, sourceZh: t.zh, origin: "mind" });
      setSavedFlash(id);
      setTimeout(() => setSavedFlash(null), 1200);
      toast.success("Saved to your book · 已收入思想之书");
    }
  };

  return (
    <div className="pb-6">
      {/* Question banner */}
      <header className="px-5 pt-5">
        <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-[var(--shadow-soft)] backdrop-blur" style={{ background: "var(--gradient-soft)" }}>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Your question · 你的问题
          </div>
          <p className="mt-2 font-serif text-[18px] leading-snug">{currentQuestion}</p>
          <p className="zh mt-1.5 text-[12px] leading-loose text-muted-foreground">{currentQuestionZh}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {greatMindResponses.map((r) => {
              const t = thinkers.find((x) => x.id === r.thinkerId)!;
              const a = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all",
                    a ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card/70 text-muted-foreground"
                  )}
                >
                  <span className={cn("flex h-5 w-5 items-center justify-center rounded-full font-serif text-[11px]", toneClass(t.tone))}>{t.initial}</span>
                  {t.en}
                  {a && <span className="ml-1 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
                </button>
              );
            })}
            <button className="inline-flex items-center gap-1 rounded-full border border-dashed border-border bg-card/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-card/70">
              <Plus className="h-3 w-3" /> Invite
            </button>
          </div>
        </div>
      </header>

      {/* Live state strip */}
      <div className="mt-4 flex items-center justify-between gap-2 px-5 text-[11px]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-2.5 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--sage)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]" />
          </span>
          <span className="text-foreground/80">Speaking now: <span className="font-serif">{activeThinker?.en}</span></span>
          <span className="zh text-muted-foreground">· 正在说话</span>
        </div>
        <div className="text-muted-foreground">Your turn → <span className="zh">轮到你</span></div>
      </div>

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDragEnter={() => setOver(true)}
        onDragLeave={() => setOver(false)}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDrop={handleDrop}
        className={cn(
          "mx-5 mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-3 text-[11.5px] transition-all",
          over ? "border-primary bg-primary/8 text-primary" : "border-border/60 bg-card/40 text-muted-foreground"
        )}
      >
        <Bookmark className="h-3.5 w-3.5" />
        Drag a quote here to save · 拖入此处收藏
      </div>

      {/* Responses feed */}
      <section className="mt-4 space-y-3 px-5">
        {greatMindResponses.map((r) => {
          const t = thinkers.find((x) => x.id === r.thinkerId)!;
          const id = `mind-${t.id}`;
          const saved = isSaved(id);
          const flash = savedFlash === t.id;
          return (
            <article
              key={t.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/qid", t.id)}
              onClick={() => setActive(t.id)}
              className={cn(
                "group cursor-grab rounded-3xl border bg-card/85 p-5 shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:-translate-y-0.5 active:cursor-grabbing",
                active === t.id ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
                flash && "ring-2 ring-[color:var(--sage)]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full font-serif text-base", toneClass(t.tone))}>
                  {t.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-[14px] leading-tight">{t.en}</div>
                  <div className="zh text-[11px] text-muted-foreground">{t.zh}</div>
                </div>
                {saved && <BookmarkCheck className="h-4 w-4 text-[color:var(--sage)]" />}
              </div>
              <p className="mt-3 font-serif text-[15.5px] leading-relaxed">"{r.en}"</p>
              <p className="zh mt-2 text-[12px] leading-loose text-muted-foreground">"{r.zh}"</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <ActionChip
                  active={saved}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (saved) return;
                    saveQuote({ id, text: r.en, textZh: r.zh, source: t.en, sourceZh: t.zh, origin: "mind" });
                    toast.success("Saved · 已收藏");
                  }}
                  icon={saved ? BookmarkCheck : Bookmark}
                >
                  {saved ? "Saved" : "Save insight"}
                </ActionChip>
                <ActionChip onClick={(e) => { e.stopPropagation(); toast(`Asking ${t.en} deeper…`); }} icon={MessageCircle}>
                  Ask deeper
                </ActionChip>
                <ActionChip onClick={(e) => { e.stopPropagation(); toast("Inviting another voice…"); }} icon={Plus}>
                  Invite another
                </ActionChip>
                <ActionChip onClick={(e) => { e.stopPropagation(); toast("Comparing views…"); }} icon={Repeat}>
                  Compare views
                </ActionChip>
              </div>
            </article>
          );
        })}
      </section>

      {/* Suggested follow-ups */}
      <section className="mt-6 px-5">
        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Suggested follow-ups · 建议追问
        </div>
        <div className="grid gap-2">
          {followups.map((f) => (
            <button
              key={f.en}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card/70 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div>
                <div className="text-[13px] leading-snug">{f.en}</div>
                <div className="zh mt-0.5 text-[11px] text-muted-foreground">{f.zh}</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      {/* Bottom actions */}
      <section className="mt-6 px-5">
        <div className="rounded-3xl border border-border bg-card/80 p-3 shadow-[var(--shadow-soft)] backdrop-blur">
          <div className="flex items-center gap-2 rounded-2xl bg-background/50 px-3 py-2">
            <input
              placeholder="Reply now · 现在回应…"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70"
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <BottomChip>Ask follow-up <span className="zh opacity-70">追问</span></BottomChip>
            <BottomChip>Switch topic <span className="zh opacity-70">换话题</span></BottomChip>
            <BottomChip><Plus className="mr-1 inline h-3 w-3" />Invite thinker</BottomChip>
            <Link to="/meetings" className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] hover:bg-accent">
              <FileText className="h-3 w-3" /> Summarize so far
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionChip({ children, icon: Icon, onClick, active }: { children: React.ReactNode; icon: any; onClick?: (e: React.MouseEvent) => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-all",
        active
          ? "border-[color:var(--sage)] bg-[color:var(--sage)]/15 text-foreground"
          : "border-border bg-card hover:bg-accent"
      )}
    >
      <Icon className="h-3 w-3" />
      {children}
    </button>
  );
}

function BottomChip({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-[11px] hover:bg-accent">
      {children}
    </button>
  );
}
