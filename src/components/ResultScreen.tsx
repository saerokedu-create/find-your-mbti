import type { CSSProperties } from "react";
import type { MbtiResult } from "@/lib/mbti";

type ResultScreenProps = {
  name: string;
  result: MbtiResult;
  onRestart: () => void;
};

export function ResultScreen({ name, result, onRestart }: ResultScreenProps) {
  const initial = name.trim().slice(0, 1);

  return (
    <main className="mt-16 grid flex-1 items-start gap-10 lg:grid-cols-2">
      {/* left: the type */}
      <section className="rise-in rounded-3xl bg-surface p-7 ring-1 ring-hairline backdrop-blur-2xl">
        <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary ring-1 ring-hairline">
          검사 결과
        </span>

        <div className="mt-6 flex items-center gap-4">
          <div className="brand-fill grid size-14 place-items-center rounded-2xl font-display text-xl font-bold ring-1 ring-hairline">
            {initial}
          </div>
          <p className="text-sm text-muted-foreground">{name}님의 유형</p>
        </div>

        <p className="pop-in brand-text mt-7 font-display text-[clamp(3.5rem,14vw,8rem)] font-bold leading-none tracking-tighter">
          {result.code}
        </p>

        <p className="mt-5 font-display text-2xl font-semibold tracking-tight">
          {result.type.alias}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.type.summary}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-strong p-5 ring-1 ring-hairline">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-secondary">강점</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {result.type.strengths.join(" · ")}
            </p>
          </div>
          <div className="rounded-2xl bg-surface-strong p-5 ring-1 ring-hairline">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              아킬레스건
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {result.type.weaknesses.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* right: axis breakdown + restart */}
      <section
        className="rise-in rounded-3xl bg-surface p-7 ring-1 ring-hairline backdrop-blur-2xl"
        style={{ animationDelay: "120ms" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            축별 결과
          </span>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-hairline">
            12문항
          </span>
        </div>

        <div className="mt-6 space-y-5">
          {result.axes.map((reading, i) => (
            <div key={reading.axis.key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-sm font-semibold tracking-tight">
                  {reading.dominantLabel}{" "}
                  <span className="brand-text font-bold">{reading.dominantPercent}%</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {reading.minorLabel} {reading.minorPercent}%
                </span>
              </div>
              <div className="mt-2 h-2.5 rounded-full bg-muted">
                <div
                  className="brand-bar h-2.5 rounded-full"
                  style={
                    {
                      width: `${reading.dominantPercent}%`,
                      "--w": `${reading.dominantPercent}%`,
                      animationDelay: `${180 + i * 90}ms`,
                    } as CSSProperties
                  }
                />
              </div>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                {reading.axis.caption}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="brand-bg mt-8 w-full rounded-xl px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
        >
          다른 이름으로 다시 검사
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          간단한 셀프 체크입니다. 실제 검사지는 아니에요.
        </p>
      </section>
    </main>
  );
}
