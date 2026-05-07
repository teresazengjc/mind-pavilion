import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";
import { useAgora } from "@/store/useAgora";
import { BiText } from "@/components/common/BiText";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Ask · 提问 — Mind Agora" },
      { name: "description", content: "Bring your inner question to a quiet pavilion of great minds." },
      { property: "og:title", content: "Ask · Mind Agora" },
      { property: "og:description", content: "What question is on your mind today? 今天，什么问题在你心里？" },
    ],
  }),
  component: AskPage,
});

function AskPage() {
  const navigate = useNavigate();
  const { setQuestion, setCategory, selectedCategory, currentQuestion } = useAgora();
  const [text, setText] = useState(currentQuestion);

  const submit = () => {
    setQuestion(text, "我对未来感到迷茫。我应该选择稳定，还是选择自由？");
    navigate({ to: "/great-minds" });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <BiText en="What question is on your mind today?" zh="今天，什么问题在你心里？" as="h1" serif className="text-center text-4xl md:text-5xl" />

      <div className="mt-12 rounded-3xl border border-border bg-card/70 p-6 shadow-[var(--shadow-paper)] backdrop-blur">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="I feel lost about my future. Should I choose stability or freedom?&#10;我对未来感到迷茫。我应该选择稳定，还是选择自由？"
          className="w-full resize-none bg-transparent font-serif text-xl leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />
      </div>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Choose a theme · 选择主题</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = selectedCategory === c.en;
            return (
              <button
                key={c.en}
                onClick={() => setCategory(active ? null : c.en)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  active
                    ? "border-transparent bg-[var(--sage)]/30 text-foreground"
                    : "border-border bg-card/40 text-muted-foreground hover:bg-card"
                )}
              >
                {c.en} <span className="zh ml-1 text-xs opacity-70">{c.zh}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={submit}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:translate-y-[-1px]"
        >
          Bring this question to 问思阁
          <span className="zh text-xs opacity-80">把这个问题带入问思阁</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
