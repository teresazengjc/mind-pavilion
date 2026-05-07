import { createFileRoute } from "@tanstack/react-router";
import { Cpu, Users, BookOpen, Brain, LineChart, Share2 } from "lucide-react";
import { BiText } from "@/components/common/BiText";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works · 它如何工作 — Mind Agora" },
      { name: "description", content: "Powered by Gemma 4, multi-agent prompting, RAG, and a personal memory layer." },
      { property: "og:title", content: "How It Works · Mind Agora" },
      { property: "og:description", content: "How Mind Agora works. 它如何工作。" },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { icon: Cpu, en: "Gemma 4 powers the core reasoning and conversation experience.", zh: "Gemma 4 驱动核心推理和对话体验。" },
  { icon: Users, en: "Multi-agent prompting creates distinct voices for different thinkers.", zh: "多 Agent prompt 为不同思想人物创造差异化声音。" },
  { icon: BookOpen, en: "Retrieval-augmented generation supports Quote Mode with verified texts.", zh: "RAG 检索增强生成支持基于可信文本的原著引用模式。" },
  { icon: Brain, en: "User memory stores saved quotes, short reflections, and reading preferences.", zh: "用户记忆系统保存收藏句子、短反思和阅读偏好。" },
  { icon: LineChart, en: "Insight generation turns conversations into weekly, monthly, and yearly reports.", zh: "洞察生成系统将对话整理为周报、月报和年报。" },
  { icon: Share2, en: "Export system turns the archive into a personal mini publication.", zh: "导出系统将思想档案转化为个人小出版物。" },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <BiText en="How It Works" zh="它如何工作" as="h1" serif className="text-4xl md:text-5xl" />
      <p className="mt-3 text-base text-muted-foreground">A calm pavilion built on quiet, careful technology.</p>
      <p className="zh text-sm text-muted-foreground/80">一个建立在安静、细心技术之上的思考阁。</p>

      <ol className="mt-12 space-y-5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-5 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-all hover:-translate-y-0.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
              <p className="mt-1 font-serif text-lg leading-snug">{s.en}</p>
              <p className="zh mt-1 text-sm text-muted-foreground">{s.zh}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
