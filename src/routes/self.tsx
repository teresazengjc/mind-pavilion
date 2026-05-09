import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Sparkles, ArrowRight, Share2, Plus, BookHeart, TrendingUp, Bookmark } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { themes, growingSignals } from "@/data/feedData";
import { useAgora } from "@/store/useAgora";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/self")({
  head: () => ({
    meta: [
      { title: "Self Inquiry · 自我问思 — Mind Agora" },
      { name: "description", content: "Your themes, signals, and inner archive — a gentle map of how you think." },
    ],
  }),
  component: SelfInquiryPage,
});

const timeline = [
  { week: "This week", en: "Freedom & belonging", zh: "自由与归属", tone: "mist" },
  { week: "Last week", en: "Creative block", zh: "创作瓶颈", tone: "gold" },
  { week: "2 weeks ago", en: "Solitude", zh: "孤独", tone: "sage" },
  { week: "3 weeks ago", en: "Meaning of work", zh: "工作的意义", tone: "mist" },
];

const concerns = [
  { en: "I want freedom but fear what I'd lose.", zh: "我渴望自由，却害怕失去。" },
  { en: "I am tired of performing certainty.", zh: "我厌倦了表演笃定。" },
  { en: "I miss the version of me who wrote freely.", zh: "我想念那个自由写作的自己。" },
];

const archive = [
  { en: "I am between versions of myself.", zh: "我正处在不同版本的自己之间。", date: "May 4" },
  { en: "Maybe success is a mirror, not a destination.", zh: "也许成功是一面镜子，不是终点。", date: "May 1" },
  { en: "Solitude becomes home when I stop trying to leave it.", zh: "当我不再想离开，孤独便成了家。", date: "Apr 27" },
];

function toneBg(tone: string) {
  if (tone === "sage") return "bg-[var(--sage)]/22 text-[color:var(--ink)]";
  if (tone === "gold") return "bg-[var(--gold)]/30 text-[color:var(--ink)]";
  return "bg-[var(--mist)]/55 text-[color:var(--ink)]";
}

function SelfInquiryPage() {
  const savedQuotes = useAgora((s) => s.savedQuotes);
  const savedThoughts = useAgora((s) => s.savedThoughts);

  return (
    <div className="pb-6">
      <PageHeader en="Self Inquiry" zh="自我问思" subtitleEn="A gentle map of how you think." subtitleZh="一张温柔的思考地图。" />

      {/* Persona card */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl border border-border p-5 shadow-[var(--shadow-paper)]" style={{ background: "var(--gradient-soft)" }}>
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-b-full border border-white/40 opacity-50" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 font-serif text-2xl text-primary">
              问
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Your persona · 你的画像</div>
              <div className="mt-0.5 font-serif text-[18px] leading-tight">A Quiet Inquirer</div>
              <div className="zh text-[12px] text-muted-foreground">一位安静的提问者</div>
            </div>
            <button className="rounded-full p-2 text-muted-foreground hover:bg-card">
              <Settings className="h-4 w-4" />
            </button>
          </div>
          <p className="relative mt-3 text-[12.5px] leading-relaxed text-foreground/85">
            You ask soft questions. You return often. You are not searching for answers — you are learning to live with better questions.
          </p>
          <p className="zh relative mt-1 text-[11.5px] leading-loose text-muted-foreground">
            你提出温和的问题，常常回到这里。你不是在找答案——你在学习与更好的问题共处。
          </p>
          <div className="relative mt-3 flex flex-wrap gap-1.5">
            <Stat n={savedQuotes.length} en="Quotes" zh="金句" />
            <Stat n={savedThoughts.length} en="Thoughts" zh="思绪" />
            <Stat n={12} en="Questions" zh="问题" />
            <Stat n={7} en="Days" zh="天" />
          </div>
        </div>
      </section>

      {/* Theme timeline */}
      <section className="mt-7 px-5">
        <SectionTitle en="Theme timeline" zh="主题时间线" />
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card/70">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-border/50 px-4 py-3 last:border-0">
              <div className={cn("h-2 w-2 rounded-full", toneBg(t.tone))} />
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] leading-tight">{t.en}</div>
                <div className="zh text-[11px] text-muted-foreground">{t.zh}</div>
              </div>
              <div className="text-[10.5px] text-muted-foreground">{t.week}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Thought graph (interactive) */}
      <section className="mt-7 px-5">
        <SectionTitle en="Current themes" zh="当前主题" />
        <div className="mt-3 rounded-3xl border border-border bg-card/70 p-5">
          <div className="relative mx-auto h-52 w-full">
            {/* center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-3 py-1.5 text-[11px] text-primary-foreground shadow-[var(--shadow-soft)]">
              You · 你
            </div>
            {themes.map((t, i) => {
              const angle = (i / themes.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 90;
              const x = 50 + (Math.cos(angle) * radius) / 3;
              const y = 50 + (Math.sin(angle) * radius) / 2;
              const size = 28 + (t.weight / 100) * 32;
              return (
                <button
                  key={t.en}
                  className="group absolute flex items-center justify-center rounded-full border border-border bg-background/80 font-serif text-[11px] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: size,
                    height: size,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="px-1 text-center leading-tight">{t.en}</span>
                </button>
              );
            })}
            {/* connecting lines (svg) */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {themes.map((_, i) => {
                const angle = (i / themes.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 90;
                const x = 50 + (Math.cos(angle) * radius) / 3;
                const y = 50 + (Math.sin(angle) * radius) / 2;
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="0.2"
                    className="text-border"
                  />
                );
              })}
            </svg>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {themes.map((t) => (
              <span key={t.en} className="rounded-full bg-[var(--mist)]/35 px-2 py-0.5 text-[10.5px] text-[color:var(--ink)]">
                {t.en} <span className="zh ml-0.5 opacity-70">{t.zh}</span> · {t.weight}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recent concerns */}
      <section className="mt-7 px-5">
        <SectionTitle en="Recent concerns" zh="近期心事" />
        <div className="mt-3 grid gap-2">
          {concerns.map((c, i) => (
            <article key={i} className="group rounded-2xl border border-border bg-card/70 p-4 transition-all hover:-translate-y-0.5">
              <p className="font-serif text-[14px] leading-snug">"{c.en}"</p>
              <p className="zh mt-1 text-[11.5px] leading-loose text-muted-foreground">"{c.zh}"</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <InsightAction icon={Sparkles}>Reflect on this</InsightAction>
                <InsightAction icon={ArrowRight}>Expand</InsightAction>
                <InsightAction icon={BookHeart}>Add to Thought Book</InsightAction>
                <InsightAction icon={Share2}>Share to Circle</InsightAction>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Growing signals */}
      <section className="mt-7 px-5">
        <SectionTitle en="Growing signals" zh="成长的信号" />
        <div className="mt-3 grid gap-2">
          {growingSignals.map((g, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-[color:var(--sage)]/30 bg-[color:var(--sage)]/8 p-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--sage)]/30">
                <TrendingUp className="h-3.5 w-3.5 text-[color:var(--ink)]" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] leading-snug">{g.en}</div>
                <div className="zh mt-0.5 text-[11px] text-muted-foreground">{g.zh}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection archive */}
      <section className="mt-7 px-5">
        <div className="flex items-baseline justify-between">
          <SectionTitle en="Reflection archive" zh="反思档案" />
          <Link to="/library" className="text-[11px] text-primary">All · 全部</Link>
        </div>
        <div className="mt-3 grid gap-2">
          {archive.map((a, i) => (
            <article key={i} className="paper rounded-2xl border border-border p-4 shadow-[var(--shadow-paper)]">
              <div className="flex items-center justify-between text-[10.5px] text-muted-foreground">
                <span>{a.date}</span>
                <Bookmark className="h-3 w-3" />
              </div>
              <p className="mt-1.5 font-serif text-[14.5px] leading-snug">"{a.en}"</p>
              <p className="zh mt-1 text-[11.5px] leading-loose text-muted-foreground">"{a.zh}"</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-7 px-5">
        <Link to="/ask" className="flex items-center justify-between rounded-2xl border border-dashed border-border bg-card/40 p-4 text-[12px] hover:bg-card/70">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Plus className="h-4 w-4" /> Add a new inquiry · 添加新的问思
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </section>
    </div>
  );
}

function Stat({ n, en, zh }: { n: number; en: string; zh: string }) {
  return (
    <div className="rounded-xl bg-white/55 px-2.5 py-1.5 text-center backdrop-blur">
      <span className="font-serif text-[14px]">{n}</span>
      <span className="ml-1 text-[10.5px] text-muted-foreground">{en}</span>
      <span className="zh ml-0.5 text-[10px] text-muted-foreground/85">{zh}</span>
    </div>
  );
}

function SectionTitle({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <h3 className="font-serif text-[15px]">{en}</h3>
      <span className="zh text-[11px] text-muted-foreground">{zh}</span>
    </div>
  );
}

function InsightAction({ children, icon: Icon }: { children: React.ReactNode; icon: any }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-border bg-card/70 px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground">
      <Icon className="h-3 w-3" />
      {children}
    </button>
  );
}
