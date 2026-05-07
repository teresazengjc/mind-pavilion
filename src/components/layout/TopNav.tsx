import { Link, useLocation } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { navItems } from "@/data/mockData";
import { useAgora } from "@/store/useAgora";
import { PavilionMark } from "@/components/common/PavilionMark";
import { cn } from "@/lib/utils";

export function TopNav() {
  const location = useLocation();
  const count = useAgora((s) => s.savedQuotes.length);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5 text-foreground">
          <PavilionMark className="text-primary" size={26} />
          <div className="leading-tight">
            <div className="font-serif text-lg">问思阁</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Mind Agora</div>
          </div>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group rounded-full px-3 py-1.5 text-sm transition-all",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{item.en}</span>
                <span className="zh ml-1.5 text-[10px] opacity-60">{item.zh}</span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
            <Bookmark className="h-3.5 w-3.5" />
            <span>{count}</span>
            <span className="zh ml-0.5 opacity-70">收藏</span>
          </div>
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto px-6 pb-2 lg:hidden">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs transition-all",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              {item.en}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
