import { cn } from "@/lib/utils";
import type { Pole, Question } from "@/lib/mbti";

type QuizScreenProps = {
  question: Question;
  index: number;
  total: number;
  selected: Pole | null;
  onAnswer: (pole: Pole) => void;
  onBack: () => void;
};

export function QuizScreen({
  question,
  index,
  total,
  selected,
  onAnswer,
  onBack,
}: QuizScreenProps) {
  const percent = Math.round(((index + (selected ? 1 : 0)) / total) * 100);

  return (
    <main className="mt-16 flex flex-1 items-center">
      <div className="w-full">
        <div className="mx-auto w-full max-w-3xl">
          {/* progress */}
          <div className="flex items-end justify-between gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              문항 {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="brand-text font-display text-xs font-bold uppercase tracking-[0.2em]">
              {percent}%
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
            <div
              className="brand-bg h-1.5 rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* question */}
          <div key={question.id} className="rise-in mt-12">
            <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary ring-1 ring-hairline backdrop-blur-xl">
              {question.axis} · {axisCaption(question.axis)}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              {question.prompt}
            </h2>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {question.options.map((option) => {
                const isSelected = selected === option.pole;
                const isDimmed = selected !== null && !isSelected;

                return (
                  <button
                    key={option.pole}
                    type="button"
                    onClick={() => onAnswer(option.pole)}
                    disabled={selected !== null}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex flex-col items-start gap-3 rounded-2xl p-6 text-left backdrop-blur-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "bg-surface-strong ring-2 ring-primary"
                        : "bg-surface ring-1 ring-hairline hover:-translate-y-1 hover:bg-surface-strong hover:ring-hairline-strong",
                      isDimmed && "opacity-40",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-xl font-display text-lg font-bold ring-1",
                        isSelected
                          ? "brand-bg text-primary-foreground ring-transparent"
                          : "bg-surface-inset text-foreground ring-hairline",
                      )}
                    >
                      {option.pole}
                    </span>
                    <span className="font-display text-xl font-semibold tracking-tight">
                      {option.label}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {option.detail}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* nav */}
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              disabled={index === 0 || selected !== null}
              className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              이전
            </button>
            <span className="text-xs text-muted-foreground">둘 중 하나를 고르면 다음으로 넘어가요</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function axisCaption(axis: string) {
  if (axis === "EI") return "에너지";
  if (axis === "SN") return "정보 수집";
  if (axis === "TF") return "결정";
  return "생활 방식";
}
