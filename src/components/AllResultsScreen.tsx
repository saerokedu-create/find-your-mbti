import { useEffect, useState } from "react";
import { MBTI_TYPES } from "@/lib/mbti";
import { loadAllResults, type SavedResultSummary } from "@/lib/results";

type AllResultsScreenProps = {
  onBack: () => void;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function AllResultsScreen({ onBack }: AllResultsScreenProps) {
  const [results, setResults] = useState<SavedResultSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadAllResults()
      .then((rows) => {
        if (!cancelled) setResults(rows);
      })
      .catch(() => {
        if (!cancelled) setError("결과를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const distribution = new Map<string, number>();
  for (const row of results ?? []) {
    distribution.set(row.mbtiCode, (distribution.get(row.mbtiCode) ?? 0) + 1);
  }
  const topTypes = [...distribution.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <main className="mt-16 flex flex-1 flex-col items-center">
      <section className="rise-in w-full max-w-2xl rounded-3xl bg-surface p-7 ring-1 ring-hairline backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            전체 결과
          </span>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-hairline">
            최근 100개
          </span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
          완료된 검사 <span className="brand-text">{results?.length ?? "…"}</span>건
        </h2>

        {results && topTypes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {topTypes.map(([code, count]) => (
              <span
                key={code}
                className="rounded-full bg-surface-strong px-3 py-1 text-xs font-medium text-foreground ring-1 ring-hairline"
              >
                {code} {MBTI_TYPES[code]?.alias ?? ""} · {count}명
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 max-h-[46vh] space-y-3 overflow-y-auto pr-1">
          {error && <p className="text-sm text-destructive">{error}</p>}

          {!results && !error && (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-2xl bg-surface-strong ring-1 ring-hairline"
                />
              ))}
            </div>
          )}

          {results && results.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              아직 완료된 검사가 없어요. 첫 번째 검사의 주인공이 되어 보세요!
            </p>
          )}

          {results?.map((row, i) => {
            const type = MBTI_TYPES[row.mbtiCode];
            return (
              <article
                key={row.id}
                className="rise-in flex items-center gap-4 rounded-2xl bg-surface-strong p-4 ring-1 ring-hairline"
                style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
              >
                <div className="brand-fill grid size-11 shrink-0 place-items-center rounded-xl font-display text-sm font-bold ring-1 ring-hairline">
                  {row.nickname.trim().slice(0, 1) || "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{row.nickname}</p>
                  <p className="text-xs text-muted-foreground">
                    {type ? type.alias : "유형 정보 없음"} · {formatDate(row.createdAt)}
                  </p>
                </div>
                <p className="font-display text-xl font-bold tracking-tight text-foreground">
                  {row.mbtiCode}
                </p>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 w-full rounded-xl bg-surface-strong px-6 py-3.5 text-base font-semibold text-foreground ring-1 ring-hairline transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
        >
          처음 화면으로
        </button>
      </section>
    </main>
  );
}
