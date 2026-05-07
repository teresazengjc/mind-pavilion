import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Bookmark, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAgora } from "@/store/useAgora";
import { originalQuotes, books } from "@/data/mockData";
import { thinkers } from "@/data/thinkers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "金句图书馆 · Quotes Library — Mind Agora" },
      { name: "description", content: "Your library of great quotes, original texts, thinkers, and books." },
    ],
  }),
  component: LibraryPage,
});

const tabs = [
  { key: "saved", en: "Saved", zh: "我的金句" },
  { key: "minds", en: "Great Minds", zh: "前人金句" },
  { key: "books", en: "Original Texts", zh: "原著摘录" },
  { key: "thinkers", en: "Thinkers", zh: "名人推荐" },
  { key: "recBooks", en: "Books", zh: "图书推荐" },
  { key: "records", en: "Records", zh: "图书记录" },
];

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/20 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/22 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/45 text-[color:var(--ink)]";
}

function LibraryPage() {
  const [tab, setTab] = useState("saved");
  const savedQuotes = useAgora((s) => s.savedQuotes);

  return (
    <div>
      <PageHeader en="Quotes Library" zh="金句图书馆" subtitleEn="A library of voices to carry with you." subtitleZh="一座可以随身携带的声音图书馆。" />

      {/* Search */}
      <div className="px-5">
        <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-[var(--shadow-soft)]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search quotes, thinkers, books, themes…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <p className="zh mt-1.5 px-1 text-[11px] text-muted-foreground/80">搜索金句、前人、图书、主题</p>
      </div>

      {/* Tabs */}
      <div className="mt-4 -mx-1 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] transition-all",
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{t.en}</span>
            <span className="zh ml-1.5 text-[10.5px] opacity-80">{t.zh}</span>
          </button>
        ))}
      </div>

      {/* Saved */}
      {tab === "saved" && (
        <section className="mt-5 px-5">
          {savedQuotes.length === 0 ? (
            <EmptyState en="No saved quotes yet." zh="还没有收藏的金句。" />
          ) : (
            <div className="grid gap-3">
              {savedQuotes.map((q) => (
                <article key={q.id} className="paper rounded-2xl border border-border p-4 shadow-[var(--shadow-paper)]">
                  <blockquote className="font-serif text-[15px] leading-snug">"{q.text}"</blockquote>
                  <p className="zh mt-2 text-[12px] leading-loose text-muted-foreground">"{q.textZh}"</p>
                  <div className="mt-3 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">— {q.source}</div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Great Mind Quotes (using mind responses style) */}
      {tab === "minds" && (
        <section className="mt-5 grid gap-3 px-5">
          {originalQuotes.map((q, i) => (
            <article key={i} className="paper rounded-2xl border border-border p-4 shadow-[var(--shadow-paper)]">
              <blockquote className="font-serif text-[15px] leading-snug">"{q.quote}"</blockquote>
              <p className="zh mt-2 text-[12px] leading-loose text-muted-foreground">"{q.quoteZh}"</p>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-[11px]">
                <span>— {q.author}</span>
                <button className="text-primary"><Bookmark className="h-3.5 w-3.5" /></button>
              </div>
            </article>
          ))}
        </section>
      )}

      {tab === "books" && (
        <section className="mt-5 grid gap-3 px-5">
          {originalQuotes.map((q, i) => (
            <Link to="/quotes" key={i} className="flex gap-3 rounded-2xl border border-border bg-card/70 p-4 hover:bg-card">
              <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--mist)]/50 text-[10px] text-[color:var(--ink)]">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-[14px] leading-tight">{q.book}</div>
                <div className="zh text-[11px] text-muted-foreground">{q.bookZh}</div>
                <p className="mt-2 line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">"{q.quote}"</p>
              </div>
            </Link>
          ))}
        </section>
      )}

      {tab === "thinkers" && (
        <section className="mt-5 grid grid-cols-2 gap-3 px-5">
          {thinkers.map((t) => (
            <Link to="/great-minds" key={t.id} className="flex flex-col gap-2 rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-full font-serif text-lg", toneBg(t.tone))}>
                {t.initial}
              </div>
              <div>
                <div className="font-serif text-[14px] leading-tight">{t.en}</div>
                <div className="zh text-[11px] text-muted-foreground">{t.zh}</div>
              </div>
              <p className="line-clamp-2 text-[10.5px] leading-snug text-muted-foreground">{t.styleEn}</p>
            </Link>
          ))}
        </section>
      )}

      {tab === "recBooks" && (
        <section className="mt-5 grid gap-3 px-5">
          {books.map((b, i) => (
            <Link to="/reading-path" key={i} className="flex gap-3 rounded-2xl border border-border bg-card/70 p-4 hover:bg-card">
              <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--gold)]/25 text-[color:var(--ink)]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-serif text-[14px] leading-tight">{b.title}</div>
                <div className="zh text-[11px] text-muted-foreground">{b.titleZh} · {b.authorZh}</div>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">{b.reasonEn}</p>
              </div>
              <ChevronRight className="h-4 w-4 self-center text-muted-foreground" />
            </Link>
          ))}
        </section>
      )}

      {tab === "records" && (
        <section className="mt-5 px-5">
          <EmptyState en="No reading records yet. Start a reading path." zh="还没有图书记录。开始一条阅读路径吧。" />
        </section>
      )}
    </div>
  );
}

function EmptyState({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
      <div className="text-[13px] text-muted-foreground">{en}</div>
      <div className="zh mt-1 text-[11.5px] text-muted-foreground/80">{zh}</div>
    </div>
  );
}
