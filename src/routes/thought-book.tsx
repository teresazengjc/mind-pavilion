import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { exampleThoughts } from "@/data/mockData";

export const Route = createFileRoute("/thought-book")({
  head: () => ({
    meta: [
      { title: "My Thought Book · 我的思想之书 — Mind Agora" },
      { name: "description", content: "From great minds to your own voice — your personal book of thought." },
      { property: "og:title", content: "My Thought Book · Mind Agora" },
      { property: "og:description", content: "From great minds to your own voice. 从伟大的思想，到你自己的声音。" },
    ],
  }),
  component: ThoughtBook,
});

function Column({ titleEn, titleZh, descEn, descZh, children }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
      <h3 className="font-serif text-lg">{titleEn}</h3>
      <div className="zh text-xs text-muted-foreground">{titleZh}</div>
      <p className="mt-1 text-[11px] text-muted-foreground/90">{descEn}</p>
      <p className="zh text-[10px] text-muted-foreground/70">{descZh}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function ThoughtBook() {
  const { savedQuotes, savedThoughts, currentQuestion } = useAgora();
  const fromMinds = savedQuotes.filter((q) => q.origin !== "book");
  const fromBooks = savedQuotes.filter((q) => q.origin === "book");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <BiText en="My Thought Book" zh="我的思想之书" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">From great minds to your own voice.</p>
      <p className="zh text-sm text-muted-foreground/80">从伟大的思想，到你自己的声音。</p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Column titleEn="From Great Minds" titleZh="来自伟大思想" descEn="Saved sentences from AI thinker conversations." descZh="保存来自思想人物对话中的句子。">
          {fromMinds.length === 0 && <Empty />}
          {fromMinds.map((q) => (
            <div key={q.id} className="rounded-xl border border-border/70 bg-background/60 p-3">
              <p className="font-serif text-sm leading-snug">"{q.text}"</p>
              <p className="zh mt-1 text-[11px] text-muted-foreground">"{q.textZh}"</p>
              <div className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/80">— {q.source}</div>
            </div>
          ))}
        </Column>
        <Column titleEn="From Books" titleZh="来自书籍" descEn="Saved original quotes from Quote Mode." descZh="保存来自原著引用模式的句子。">
          {fromBooks.length === 0 && <Empty />}
          {fromBooks.map((q) => (
            <div key={q.id} className="paper rounded-xl border border-border/70 p-3">
              <p className="font-serif text-sm leading-snug">"{q.text}"</p>
              <p className="zh mt-1 text-[11px] text-muted-foreground">"{q.textZh}"</p>
              <div className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/80">— {q.source}</div>
            </div>
          ))}
        </Column>
        <Column titleEn="From Myself" titleZh="来自我自己" descEn="Short reflections written by you." descZh="用户自己写下的短想法。">
          {savedThoughts.length === 0 && exampleThoughts.slice(0, 2).map((t, i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-background/60 p-3">
              <p className="font-serif text-sm">{t.en}</p>
              <p className="zh mt-1 text-[11px] text-muted-foreground">{t.zh}</p>
            </div>
          ))}
          {savedThoughts.map((t) => (
            <div key={t.id} className="rounded-xl border border-[var(--sage)] bg-[var(--sage)]/10 p-3">
              <p className="font-serif text-sm">{t.text}</p>
            </div>
          ))}
        </Column>
      </div>

      {/* Mini book preview */}
      <div className="mt-12">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">A Small Book of My Questions · 我的问题小书</div>
        <div className="mt-4 grid gap-0 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-paper)] md:grid-cols-2">
          <div className="paper border-r border-border p-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Mind Agora · 问思阁</div>
            <h2 className="mt-6 font-serif text-3xl leading-tight">A Small Book of My Questions</h2>
            <div className="zh mt-1 text-base text-muted-foreground">我的问题小书</div>
            <div className="mt-12 space-y-2 text-sm">
              {[
                ["I.", "Questions I Asked", "我提出的问题"],
                ["II.", "Words I Saved", "我收藏的话"],
                ["III.", "Books I May Need", "我可能需要的书"],
                ["IV.", "Thoughts I Wrote", "我写下的想法"],
                ["V.", "What I Am Becoming", "我正在成为的样子"],
              ].map(([n, en, zh]) => (
                <div key={n} className="flex items-baseline gap-3 border-b border-dashed border-border/70 py-1.5">
                  <span className="font-serif text-muted-foreground">{n}</span>
                  <span className="font-serif">{en}</span>
                  <span className="zh ml-auto text-xs text-muted-foreground">{zh}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="paper p-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">I. Questions I Asked</div>
            <p className="mt-4 font-serif text-xl leading-snug">{currentQuestion}</p>
            <div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">II. Words I Saved</div>
            <div className="mt-3 space-y-3">
              {(savedQuotes.length ? savedQuotes : [{ text: "Live the questions now.", textZh: "现在，活在这些问题之中。", source: "Rilke", id: "x", origin: "book" as const, sourceZh: "" }]).slice(0, 2).map((q) => (
                <div key={q.id}>
                  <p className="font-serif text-sm italic">"{q.text}"</p>
                  <p className="zh text-[11px] text-muted-foreground">"{q.textZh}" — {q.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/reflection" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary/90">
            <Sparkles className="h-4 w-4" /> Generate Weekly Reflection <span className="zh text-xs opacity-80">生成周反思</span>
          </Link>
          <button onClick={() => toast("PDF export queued · PDF 导出中")} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-accent">
            <Download className="h-4 w-4" /> Export as PDF <span className="zh text-xs text-muted-foreground">导出为 PDF</span>
          </button>
          <button onClick={() => toast("Mini book link copied · 链接已复制")} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:bg-accent">
            <Share2 className="h-4 w-4" /> Share as Mini Book <span className="zh text-xs text-muted-foreground">分享为小书</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return <p className="rounded-xl border border-dashed border-border/70 bg-background/40 p-3 text-center text-[11px] text-muted-foreground">Nothing yet · 暂无</p>;
}
