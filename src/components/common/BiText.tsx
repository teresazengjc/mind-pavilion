import { cn } from "@/lib/utils";

type Props = {
  en: string;
  zh: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  zhClassName?: string;
  serif?: boolean;
};

export function BiText({ en, zh, as: Tag = "div", className, zhClassName, serif }: Props) {
  return (
    <Tag className={cn(className)}>
      <span className={cn("block", serif && "font-serif")}>{en}</span>
      <span className={cn("zh block text-muted-foreground/80 mt-1 text-[0.78em] font-light", zhClassName)}>{zh}</span>
    </Tag>
  );
}
