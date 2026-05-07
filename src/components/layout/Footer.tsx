import { PavilionMark } from "@/components/common/PavilionMark";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-sm text-muted-foreground">
        <PavilionMark className="text-primary/70" size={24} />
        <div className="font-serif text-base text-foreground">问思阁 | Mind Agora</div>
        <div className="text-xs">Where your questions meet great minds. · 让你的问题与伟大思想相遇</div>
      </div>
    </footer>
  );
}
