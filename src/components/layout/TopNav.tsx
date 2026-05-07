import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAgora, type Lang } from "@/store/useAgora";
import { PavilionMark } from "@/components/common/PavilionMark";
import { cn } from "@/lib/utils";

const langOptions: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中" },
  { value: "both", label: "双" },
];

export function TopNav() {
  const lang = useAgora((s) => s.lang);
  const setLang = useAgora((s) => s.setLang);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.classList.remove("lang-en", "lang-zh", "lang-both");
    html.classList.add(`lang-${lang}`);
  }, [lang]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-5 py-2.5">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <PavilionMark className="text-primary" size={22} />
          <div className="leading-tight">
            <div className="zh text-[15px] font-semibold">问思阁</div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Mind Agora</div>
          </div>
        </Link>
        <div className="ml-auto flex items-center rounded-full border border-border bg-card/60 p-0.5 text-[10px]">
          {langOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => setLang(o.value)}
              className={cn(
                "rounded-full px-2 py-0.5 transition-all",
                lang === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
