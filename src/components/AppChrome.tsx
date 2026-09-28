import type { ReactNode } from "react";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-sans text-foreground antialiased">
      {/* ambient light sources */}
      <div className="pointer-events-none absolute inset-0">
        <div className="drift-a absolute -top-40 -left-32 size-[520px] rounded-full bg-glow-a blur-[120px]" />
        <div className="drift-b absolute top-1/3 -right-40 size-[560px] rounded-full bg-glow-b blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 size-[480px] rounded-full bg-glow-c blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-surface-strong font-display text-lg font-bold ring-1 ring-hairline backdrop-blur-xl">
              M
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Mindtype</span>
          </div>
          <span className="rounded-full bg-surface px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground ring-1 ring-hairline backdrop-blur-xl">
            MBTI · 16 타입
          </span>
        </header>

        {children}

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          Mindtype · 간단한 MBTI 테스트
        </footer>
      </div>
    </div>
  );
}
