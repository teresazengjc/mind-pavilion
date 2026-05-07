import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles, User, Quote, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", icon: Sparkles, zh: "问思", en: "Great Minds" },
  { to: "/self", icon: User, zh: "自我", en: "Self" },
  { to: "/library", icon: Quote, zh: "金句", en: "Quotes" },
  { to: "/circle", icon: Users, zh: "思友", en: "Circle" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-1.5">
        {tabs.map((t) => {
          const active =
            t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <li key={t.to} className="flex-1">
              <Link
                to={t.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-[22px] w-[22px] transition-transform", active && "scale-110")} strokeWidth={active ? 2.2 : 1.6} />
                <span className={cn("zh text-[11px] leading-none", active && "font-semibold")}>{t.zh}</span>
                <span className="text-[9px] uppercase tracking-wider leading-none opacity-70">{t.en}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
