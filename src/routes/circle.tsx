import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Quote as QuoteIcon, BookOpen, PenLine, HelpCircle, Sparkles, Repeat, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/PageHeader";
import { feedItems, feedTabs, composeActions } from "@/data/feedData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "Mind Circle · 思友圈 — Mind Agora" },
      { name: "description", content: "A quiet place to share questions, quotes, and reflections." },
    ],
  }),
  component: CirclePage,
});

const typeMeta: Record<string, { icon: typeof QuoteIcon; en: string; zh: string; tone: string }> = {
  quote: { icon: QuoteIcon, en: "Quote", zh: "金句", tone: "mist" },
  thought: { icon: PenLine, en: "Thought", zh: "树洞", tone: "sage" },
  book: { icon: BookOpen, en: "Book", zh: "书籍", tone: "gold" },
  debate: { icon: HelpCircle, en: "Debate", zh: "辩论", tone: "mist" },
};

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/22 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/30 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/55 text-[color:var(--ink)]";
}

const topicCards = [
  { en: "On freedom", zh: "关于自由", count: 124, tone: "mist" },
  { en: "On solitude", zh: "关于孤独", count: 98, tone: "sage" },
  { en: "On becoming", zh: "关于成为", count: 71, tone: "gold" },
];

function CirclePage() {
  const [tab, setTab] = useState("rec");
  const [composer, setComposer] = useState<string | null>(null);

  return (
    <div className="pb-6">
      <PageHeader en="Mind Circle" zh="思友圈" subtitleEn="A quiet circle of fellow thinkers." subtitleZh="一群安静思考的同行人。" />

      {/* Compose row */}
      <section className="px-5">
        <div className="rounded-3xl border border-border bg-card/80 p-3 shadow-[var(--shadow-soft)]">
          <div className="text-[11px] text-muted-foreground">What would you like to share? <span className="zh">想分享什么？</span></div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {composeActions.map((a) => {
              const active = composer === a.key;
              return (
                <button
                  key={a.key}
                  onClick={() => setComposer(active ? null : a.key)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border px-1 py-2 text-[10.5px] transition-all",
                    active ? "border-primary/50 bg-primary/8 -translate-y-0.5" : "border-border bg-card/60 hover:bg-card"
                  )}
                >
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded-full font-serif text-[11px]", toneBg(a.tone))}>
                    {a.en[8]?.toUpperCase() || "+"}
                  </span>
                  <span className="leading-tight text-foreground/85">{a.en.replace("Share a ", "")}</span>
                  <span className="zh text-[10px] text-muted-foreground">{a.zh.replace("分享", "")}</span>
                </button>
              );
            })}
          </div>
          {composer && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-300">
              <textarea
                rows={2}
                placeholder="Write softly… 轻轻写下…"
                className="w-full resize-none rounded-2xl border border-border bg-background/40 p-3 text-[13px] outline-none placeholder:text-muted-foreground/60 focus:border-primary/40"
              />
              <div className="mt-2 flex items-center justify-between">
                <button onClick={() => setComposer(null)} className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                  <X className="h-3 w-3" /> Cancel
                </button>
                <button onClick={() => { setComposer(null); toast.success("Shared softly · 已轻声发布"); }} className="rounded-full bg-primary px-3.5 py-1.5 text-[11px] text-primary-foreground">
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Topic cards */}
      <section className="mt-5">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {topicCards.map((t) => (
            <button
              key={t.en}
              className="group shrink-0 rounded-2xl border border-border bg-card/70 p-3 text-left transition-all hover:-translate-y-0.5"
            >
              <div className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]", toneBg(t.tone))}>
                <Sparkles className="h-2.5 w-2.5" /> Topic
              </div>
              <div className="mt-1.5 font-serif text-[13.5px] leading-tight">{t.en}</div>
              <div className="zh text-[11px] text-muted-foreground">{t.zh} · {t.count}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[52px] z-20 mt-3 bg-background/85 backdrop-blur-xl">
        <div className="-mx-1 flex gap-1 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {feedTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] transition-all",
                tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{t.en}</span>
              <span className="zh ml-1.5 text-[10.5px] opacity-80">{t.zh}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <section className="mt-3 grid gap-3 px-5">
        {feedItems.map((item) => {
          const meta = typeMeta[item.type];
          const Icon = meta.icon;
          return (
            <article key={item.id} className="group rounded-3xl border border-border bg-card/85 p-4 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 font-serif text-sm text-primary">
                  {item.user.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium leading-tight">{item.user.name}</div>
                  <div className="text-[11px] text-muted-foreground">{item.user.handle} · {item.time}</div>
                </div>
                <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]", toneBg(meta.tone))}>
                  <Icon className="h-2.5 w-2.5" /> {meta.en}
                </div>
              </div>

              <div className={cn(
                "mt-3 rounded-2xl p-3.5",
                item.type === "quote" || item.type === "thought" ? "paper border border-border/60" : "bg-background/40 border border-border/40"
              )}>
                <p className={cn(
                  "leading-snug text-foreground",
                  item.type === "quote" ? "font-serif text-[15px]" : "text-[13.5px]"
                )}>
                  {item.type === "quote" ? `"${item.en}"` : item.en}
                </p>
                <p className="zh mt-1.5 text-[11.5px] leading-loose text-muted-foreground">
                  {item.type === "quote" ? `"${item.zh}"` : item.zh}
                </p>
                {item.source && (
                  <div className="mt-2.5 border-t border-border/60 pt-2 text-[10.5px] text-muted-foreground">— {item.source}</div>
                )}
                {item.book && (
                  <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/25 px-2 py-0.5 text-[10px] text-[color:var(--ink)]">
                    <BookOpen className="h-2.5 w-2.5" /> {item.book}
                  </div>
                )}
              </div>

              {/* AI suggestion */}
              <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-[var(--mist)]/35 px-3 py-2 text-[11px] text-[color:var(--ink)]">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0" />
                <div>
                  <span className="font-medium">A voice replies: </span>
                  <span className="opacity-80">"What would you do if you trusted that completely?"</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <FeedAction icon={Sparkles}>Reflect</FeedAction>
                <FeedAction icon={Bookmark}>Save</FeedAction>
                <FeedAction icon={MessageCircle}>{item.replies}</FeedAction>
                <FeedAction icon={Heart}>{item.likes}</FeedAction>
                <FeedAction icon={Share2}>Share</FeedAction>
                <FeedAction icon={Repeat}>Remix</FeedAction>
              </div>
            </article>
          );
        })}
      </section>

      <div className="mt-6 px-5 pb-2 text-center text-[11px] text-muted-foreground/70">
        You've reached a quiet place · 这里很安静
      </div>
    </div>
  );
}

function FeedAction({ children, icon: Icon }: { children: React.ReactNode; icon: any }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground">
      <Icon className="h-3 w-3" />
      {children}
    </button>
  );
}
