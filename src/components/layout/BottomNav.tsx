import { Link, useLocation } from "@tanstack/react-router";
import { Home, MessagesSquare, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", icon: Home, zh: "主页", en: "Home" },
  { to: "/meetings", icon: MessagesSquare, zh: "会面", en: "Meetings" },
  { to: "/circle", icon: Users, zh: "思友", en: "Circle" },
  { to: "/self", icon: Sparkles, zh: "自我", en: "Inquiry" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/50 bg-background/80 backdrop-blur-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-1.5">
        {tabs.map((t) => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <li key={t.to} className="flex-1">
              <Link
                to={t.to}
                className={cn(
                  "group relative flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 transition-all",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                )}
                <Icon
                  className={cn("h-[22px] w-[22px] transition-transform duration-300", active && "scale-110")}
                  strokeWidth={active ? 2.2 : 1.6}
                />
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
