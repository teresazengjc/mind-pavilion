import { cn } from "@/lib/utils";
import { useAgora } from "@/store/useAgora";

type Props = {
  en: string;
  zh: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  zhClassName?: string;
  serif?: boolean;
};

export function BiText({ en, zh, as: Tag = "div", className, zhClassName, serif }: Props) {
  const lang = useAgora((s) => s.lang);
  if (lang === "en") {
    return <Tag className={cn(className)}><span className={cn("block", serif && "font-serif")}>{en}</span></Tag>;
  }
  if (lang === "zh") {
    return <Tag className={cn(className)}><span className={cn("zh block", serif && "font-serif")}>{zh}</span></Tag>;
  }
  return (
    <Tag className={cn(className)}>
      <span className={cn("block", serif && "font-serif")}>{en}</span>
      <span className={cn("zh block text-muted-foreground/80 mt-1 text-[0.78em] font-light", zhClassName)}>{zh}</span>
    </Tag>
  );
}
