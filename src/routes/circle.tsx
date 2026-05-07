import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Quote as QuoteIcon, BookOpen, Users, PenLine } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { feedItems, feedTabs } from "@/data/feedData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "思友圈 · Circle — Mind Agora" },
      { name: "description", content: "A calm circle of fellow thinkers, sharing quotes and reflections." },
    ],
  }),
  component: CirclePage,
});

const typeMeta: Record<string, { icon: typeof QuoteIcon; en: string; zh: string; tone: string }> = {
  quote: { icon: QuoteIcon, en: "Quote", zh: "金句", tone: "mist" },
  thought: { icon: PenLine, en: "Thought", zh: "树洞", tone: "sage" },
  book: { icon: BookOpen, en: "Book", zh: "书籍", tone: "gold" },
  debate: { icon: Users, en: "Debate", zh: "辩论", tone: "mist" },
};

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/20 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/22 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/45 text-[color:var(--ink)]";
}

function CirclePage() {
  const [tab, setTab] = useState("rec");
  return (
    <div>
      <PageHeader en="Circle" zh="思友圈" subtitleEn="A calm circle of fellow thinkers." subtitleZh="一群安静思考的同行人。" />

      {/* Feed tabs */}
      <div className="sticky top-[52px] z-20 bg-background/85 backdrop-blur-xl">
        <div className="-mx-1 flex gap-1 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {feedTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] transition-all",
                tab === t.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
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
            <article key={item.id} className="rounded-2xl border border-border bg-card/80 p-4 shadow-[var(--shadow-soft)]">
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
                "mt-3 rounded-xl p-3.5",
                item.type === "quote" || item.type === "thought" ? "paper border border-border/60" : "bg-background/40"
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
                  <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] text-[color:var(--ink)]">
                    <BookOpen className="h-2.5 w-2.5" /> {item.book}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center gap-5 text-[11px] text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary"><Heart className="h-3.5 w-3.5" /> {item.likes}</button>
                <button className="flex items-center gap-1 hover:text-primary"><MessageCircle className="h-3.5 w-3.5" /> {item.replies}</button>
                <button className="flex items-center gap-1 hover:text-primary"><Bookmark className="h-3.5 w-3.5" /></button>
                <button className="ml-auto flex items-center gap-1 hover:text-primary"><Share2 className="h-3.5 w-3.5" /></button>
              </div>
            </article>
          );
        })}
      </section>

      <div className="mt-6 px-5 pb-2 text-center text-[11px] text-muted-foreground/70">
        End of feed · 已到底部
      </div>
    </div>
  );
}
