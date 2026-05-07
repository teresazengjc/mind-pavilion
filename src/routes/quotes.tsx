import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, BookOpen, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { originalQuotes } from "@/data/mockData";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "Quote Mode · 原著引用模式 — Mind Agora" },
      { name: "description", content: "Answers grounded in original words from books and verified texts." },
      { property: "og:title", content: "Quote Mode · Mind Agora" },
      { property: "og:description", content: "Answers grounded in original words. 来自原文的回应。" },
    ],
  }),
  component: QuotesPage,
});

function QuotesPage() {
  const { saveQuote, savedQuotes } = useAgora();
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <BiText en="Quote Mode" zh="原著引用模式" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">Answers grounded in original words.</p>
      <p className="zh text-sm text-muted-foreground/80">来自原文的回应。</p>

      <div className="mt-8 rounded-2xl border border-border bg-card/60 p-6 shadow-[var(--shadow-soft)]">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Question · 问题</div>
        <div className="mt-2 font-serif text-xl">I feel lost about my future.</div>
        <div className="zh mt-1 text-sm text-muted-foreground">我对未来感到迷茫。</div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {originalQuotes.map((q) => {
          const id = `book-${q.book}`;
          const saved = savedQuotes.some((x) => x.id === id);
          return (
            <article key={id} className="paper flex flex-col rounded-2xl border border-border p-6 shadow-[var(--shadow-paper)] transition-all hover:-translate-y-1">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{q.book}</div>
              <div className="zh text-[11px] text-muted-foreground/80">{q.bookZh}</div>
              <blockquote className="mt-4 font-serif text-2xl leading-snug text-foreground">"{q.quote}"</blockquote>
              <p className="zh mt-3 text-sm leading-loose text-muted-foreground">"{q.quoteZh}"</p>
              <div className="mt-5 border-t border-border/70 pt-3 text-xs">
                <div className="font-serif text-foreground">— {q.author}</div>
                <div className="zh text-muted-foreground">{q.authorZh} · {q.sourceZh}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    if (saved) return;
                    saveQuote({ id, text: q.quote, textZh: q.quoteZh, source: `${q.author} · ${q.book}`, origin: "book" });
                    toast.success("Saved · 已收藏");
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] transition-all",
                    saved ? "border-[var(--sage)] bg-[var(--sage)]/15" : "border-border bg-card hover:bg-accent"
                  )}
                >
                  {saved ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                  {saved ? "Saved" : "Save"}
                </button>
                <button onClick={() => toast("Opening reader · 阅读更多")} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] hover:bg-accent">
                  <BookOpen className="h-3 w-3" /> Read More
                </button>
                <button onClick={() => toast("Why this quote · 为什么是这句话")} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] hover:bg-accent">
                  <HelpCircle className="h-3 w-3" /> Why?
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground/80">
        In the full version, Quote Mode uses retrieval-augmented generation to search licensed books and verified public domain texts.
        <br />
        <span className="zh">在完整版本中，原著引用模式会使用 RAG 检索授权书籍和经过验证的公共领域文本。</span>
      </p>
    </div>
  );
}
