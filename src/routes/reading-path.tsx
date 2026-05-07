import { createFileRoute } from "@tanstack/react-router";
import { BookmarkPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { books } from "@/data/mockData";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reading-path")({
  head: () => ({
    meta: [
      { title: "Reading Path · 阅读路径 — Mind Agora" },
      { name: "description", content: "Books recommended by your questions, not by popularity." },
      { property: "og:title", content: "Reading Path · Mind Agora" },
      { property: "og:description", content: "Books recommended by your questions. 由你的问题推荐书。" },
    ],
  }),
  component: ReadingPath,
});

function ReadingPath() {
  const { readingList, toggleReading } = useAgora();
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <BiText en="Reading Path" zh="阅读路径" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">Books recommended by your questions, not by popularity.</p>
      <p className="zh text-sm text-muted-foreground/80">由你的问题推荐书，而不是由热度推荐书。</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {books.map((b) => {
          const saved = readingList.includes(b.title);
          return (
            <article key={b.title} className="flex flex-col rounded-2xl border border-border bg-card/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur transition-all hover:-translate-y-1">
              <div className="paper mb-5 flex h-40 items-center justify-center rounded-xl border border-border/60 px-4 text-center">
                <div>
                  <div className="font-serif text-base leading-tight">{b.title}</div>
                  <div className="zh mt-1 text-xs text-muted-foreground">{b.titleZh}</div>
                </div>
              </div>
              <div className="font-serif text-lg">{b.title}</div>
              <div className="zh text-xs text-muted-foreground">{b.titleZh}</div>
              <div className="mt-1 text-xs text-muted-foreground">— {b.author} · <span className="zh">{b.authorZh}</span></div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{b.reasonEn}</p>
              <p className="zh mt-1.5 text-[11px] text-muted-foreground/80">{b.reasonZh}</p>
              <div className="mt-4 rounded-xl bg-[var(--mist)]/30 px-3 py-2 text-xs">
                Start from: <span className="font-serif">{b.chapter}</span>
                <span className="zh ml-2 text-muted-foreground">从 {b.chapterZh} 开始</span>
              </div>
              <button
                onClick={() => { toggleReading(b.title); toast.success(saved ? "Removed · 已移除" : "Added · 已加入阅读清单"); }}
                className={cn(
                  "mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs transition-all",
                  saved ? "border-[var(--sage)] bg-[var(--sage)]/15" : "border-border bg-card hover:bg-accent"
                )}
              >
                {saved ? <Check className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
                {saved ? "In Reading List" : "Save to Reading List"}
                <span className="zh opacity-70">{saved ? "已加入" : "加入清单"}</span>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
