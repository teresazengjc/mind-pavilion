import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { exampleThoughts } from "@/data/mockData";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/thoughts")({
  head: () => ({
    meta: [
      { title: "My Thoughts · 我的短想法 — Mind Agora" },
      { name: "description", content: "Not every thought needs to be long. Sometimes one sentence is enough." },
      { property: "og:title", content: "My Thoughts · Mind Agora" },
      { property: "og:description", content: "Sometimes one sentence is enough. 有时候，一句话就够了。" },
    ],
  }),
  component: ThoughtsPage,
});

const LIMIT = 280;

function ThoughtsPage() {
  const navigate = useNavigate();
  const { addThought, savedThoughts } = useAgora();
  const [text, setText] = useState("");
  const remaining = LIMIT - text.length;

  const save = () => {
    if (!text.trim()) return;
    addThought(text.trim());
    setText("");
    toast.success("Thought saved · 想法已保存");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <BiText en="My Thoughts" zh="我的短想法" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">Not every thought needs to be long. Sometimes one sentence is enough.</p>
      <p className="zh text-sm text-muted-foreground/80">不是每一个想法都需要很长。有时候，一句话就够了。</p>

      <div className="mt-8 rounded-3xl border border-border bg-card/70 p-6 shadow-[var(--shadow-paper)] backdrop-blur">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, LIMIT))}
          rows={4}
          placeholder="Write one sentence from your mind today…&#10;写下今天从你心里浮现的一句话……"
          className="w-full resize-none bg-transparent font-serif text-lg leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
          <span className={cn("text-xs", remaining < 30 ? "text-[color:var(--gold)]" : "text-muted-foreground")}>
            {remaining} chars left · 剩余 {remaining}
          </span>
          <div className="flex gap-2">
            <button
              onClick={save}
              className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground hover:bg-primary/90"
            >
              Save Thought <span className="zh opacity-80">保存想法</span>
            </button>
            <button
              onClick={() => { save(); navigate({ to: "/thought-book" }); }}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-xs hover:bg-accent"
            >
              Add to Thought Book <span className="zh opacity-80">加入思想之书</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        {savedThoughts.map((t) => (
          <div key={t.id} className="rounded-2xl border border-[var(--sage)] bg-[var(--sage)]/10 p-5">
            <p className="font-serif text-base">{t.text}</p>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">Yours · 我的</div>
          </div>
        ))}
        {exampleThoughts.map((t, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
            <p className="font-serif text-base">{t.en}</p>
            <p className="zh mt-1.5 text-sm text-muted-foreground">{t.zh}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
