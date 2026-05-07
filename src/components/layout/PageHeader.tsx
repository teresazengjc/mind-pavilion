import { BiText } from "@/components/common/BiText";

type Props = { en: string; zh: string; subtitleEn?: string; subtitleZh?: string };

export function PageHeader({ en, zh, subtitleEn, subtitleZh }: Props) {
  return (
    <header className="px-5 pt-6 pb-3">
      <BiText en={en} zh={zh} as="h1" serif className="text-[26px] leading-tight" />
      {(subtitleEn || subtitleZh) && (
        <p className="mt-1.5 text-sm text-muted-foreground">
          {subtitleEn}
          {subtitleZh && <span className="zh ml-1.5 text-xs text-muted-foreground/80">{subtitleZh}</span>}
        </p>
      )}
    </header>
  );
}
