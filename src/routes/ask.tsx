import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, X, Sparkles, MessagesSquare, Users, BookOpen, ArrowRight } from "lucide-react";
import { useAgora } from "@/store/useAgora";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Think Room · 问思 — Mind Agora" },
      { name: "description", content: "A quiet room to speak your question. We listen, then bring great minds to you." },
    ],
  }),
  component: ThinkRoom,
});

type State = "idle" | "listening" | "processing" | "drafting" | "ready";

function ThinkRoom() {
  const [state, setState] = useState<State>("idle");
  const setQuestion = useAgora((s) => s.setQuestion);

  const stateLabel: Record<State, { en: string; zh: string }> = {
    idle: { en: "Tap to begin speaking", zh: "轻触开始" },
    listening: { en: "Listening…", zh: "倾听中…" },
    processing: { en: "Holding your question…", zh: "正在沉淀…" },
    drafting: { en: "Drafting your inquiry", zh: "为你拟写问题" },
    ready: { en: "Your question is ready", zh: "问题已成形" },
  };

  const start = () => {
    setState("listening");
    setTimeout(() => setState("processing"), 2400);
    setTimeout(() => setState("drafting"), 3800);
    setTimeout(() => setState("ready"), 5400);
  };

  const cancel = () => setState("idle");

  const generated = {
    coreEn: "I want freedom, but I am afraid of losing what I have built.",
    coreZh: "我渴望自由，但我害怕失去我已经建立的一切。",
    themes: [
      { en: "Freedom", zh: "自由" },
      { en: "Loss", zh: "失去" },
      { en: "Becoming", zh: "成为" },
    ],
    suggested: [
      { id: "nietzsche", initial: "N", en: "Nietzsche", zh: "尼采" },
      { id: "rilke", initial: "R", en: "Rilke", zh: "里尔克" },
      { id: "laozi", initial: "道", en: "Laozi", zh: "老子" },
    ],
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-hidden">
      {/* Soft archway gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(at 50% 20%, color-mix(in oklab, var(--mist) 60%, transparent), transparent 60%)" }} />
      <div className="pointer-events-none absolute left-1/2 top-12 -z-10 h-[420px] w-[340px] -translate-x-1/2 rounded-b-full border border-border/40 opacity-50" />

      <header className="flex items-center justify-between px-5 pt-5">
        <Link to="/" className="rounded-full border border-border bg-card/70 p-2 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </Link>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Think Room · 问思</div>
        <div className="w-8" />
      </header>

      <div className="flex flex-col items-center px-5 pt-12 pb-10">
        {/* Microphone */}
        <button
          onClick={state === "idle" ? start : undefined}
          disabled={state !== "idle" && state !== "ready"}
          className={cn(
            "relative flex h-36 w-36 items-center justify-center rounded-full transition-all",
            state === "idle" && "hover:scale-105"
          )}
        >
          {/* glow rings */}
          {state === "listening" && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/15" />
              <span className="absolute -inset-3 rounded-full border border-primary/25" />
              <span className="absolute -inset-7 rounded-full border border-primary/10" />
            </>
          )}
          {state === "processing" && (
            <span className="absolute -inset-2 animate-pulse rounded-full border border-[color:var(--gold)]/40" />
          )}
          <span
            className={cn(
              "absolute inset-3 rounded-full transition-all",
              state === "idle"
                ? "bg-gradient-to-br from-primary/20 to-[var(--mist)]/40"
                : "bg-gradient-to-br from-primary/35 to-[var(--gold)]/40"
            )}
          />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-[var(--shadow-soft)]">
            <Mic className={cn("h-8 w-8", state === "idle" ? "text-primary" : "text-[color:var(--ink)]")} />
          </span>
        </button>

        {/* Sound wave */}
        <div className="mt-7 flex h-6 items-end gap-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1 rounded-full bg-primary/60 transition-all",
                state === "listening" ? "animate-[pulse_1.2s_ease-in-out_infinite]" : ""
              )}
              style={{
                height: state === "listening" ? `${10 + Math.abs(Math.sin(i + Date.now() / 600)) * 18}px` : "4px",
                animationDelay: `${i * 80}ms`,
                opacity: state === "idle" ? 0.3 : 0.7,
              }}
            />
          ))}
        </div>

        <div className="mt-5 text-center">
          <div className="font-serif text-[18px]">{stateLabel[state].en}</div>
          <div className="zh mt-1 text-[12px] text-muted-foreground">{stateLabel[state].zh}</div>
        </div>

        {state === "idle" && (
          <p className="mt-3 max-w-xs text-center text-[12px] leading-relaxed text-muted-foreground">
            Speak freely. There is no right way to begin a question.
            <br />
            <span className="zh text-[11px] text-muted-foreground/80">自由地说，提问没有正确的方式。</span>
          </p>
        )}

        {(state === "listening" || state === "processing" || state === "drafting") && (
          <button onClick={cancel} className="mt-4 text-[11px] text-muted-foreground underline-offset-2 hover:underline">
            Cancel · 取消
          </button>
        )}
      </div>

      {/* Generated card */}
      {state === "ready" && (
        <section className="px-5 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="rounded-3xl border border-border bg-card/85 p-5 shadow-[var(--shadow-paper)] backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Core question · 核心问题</div>
            <p className="mt-2 font-serif text-[18px] leading-snug">"{generated.coreEn}"</p>
            <p className="zh mt-1.5 text-[12px] leading-loose text-muted-foreground">"{generated.coreZh}"</p>

            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Related themes · 相关主题</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {generated.themes.map((t) => (
                  <span key={t.en} className="rounded-full bg-[var(--mist)]/45 px-2.5 py-0.5 text-[11px] text-[color:var(--ink)]">
                    {t.en}<span className="zh ml-1 opacity-70">{t.zh}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Suggested thinkers · 推荐前人</div>
              <div className="mt-2 flex gap-2">
                {generated.suggested.map((s) => (
                  <button key={s.id} className="flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] hover:bg-accent">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)]/25 font-serif text-[11px] text-[color:var(--ink)]">{s.initial}</span>
                    {s.en}<span className="zh opacity-70">{s.zh}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-2">
              <Link
                to="/great-minds"
                onClick={() => setQuestion(generated.coreEn, generated.coreZh)}
                className="flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-[13px] text-primary-foreground"
              >
                <span className="inline-flex items-center gap-2"><MessagesSquare className="h-4 w-4" /> Start dialogue <span className="zh opacity-80">开始对话</span></span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/debate" className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card/70 px-3 py-2.5 text-[12px] hover:bg-card">
                  <Users className="h-3.5 w-3.5" /> Turn into debate
                </Link>
                <Link to="/quotes" className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card/70 px-3 py-2.5 text-[12px] hover:bg-card">
                  <BookOpen className="h-3.5 w-3.5" /> Get original quotes
                </Link>
              </div>
            </div>

            <button
              onClick={() => setState("idle")}
              className="mt-3 w-full rounded-2xl border border-dashed border-border bg-card/40 px-3 py-2 text-[11px] text-muted-foreground hover:bg-card/70"
            >
              Speak again · 重新说一次
            </button>
          </div>
        </section>
      )}

      {/* Type instead */}
      {state === "idle" && (
        <div className="px-5 pb-10 text-center">
          <Link to="/great-minds" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-4 py-2 text-[12px] text-muted-foreground hover:text-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Type instead <span className="zh opacity-70">改为输入</span>
          </Link>
        </div>
      )}
    </div>
  );
}
