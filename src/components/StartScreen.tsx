import { useState, type FormEvent } from "react";
import { z } from "zod";

const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해 주세요")
    .max(20, "이름은 20자까지 쓸 수 있어요"),
});

type StartScreenProps = {
  onValidName: (name: string) => void;
};

export function StartScreen({ onValidName }: StartScreenProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = nameSchema.safeParse({ name: value });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "이름을 다시 확인해 주세요");
      return;
    }
    setError(null);
    onValidName(parsed.data.name);
  }

  return (
    <main className="mt-16 grid flex-1 items-center gap-10 lg:grid-cols-2">
      {/* left: intro + name form */}
      <div className="rise-in">
        <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-secondary ring-1 ring-hairline backdrop-blur-xl">
          Personality Test
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          당신의
          <br />
          <span className="brand-text">성격 유형</span>을
          <br />
          발견하세요
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          이름을 입력하고 12개 문항에 답하면, 4가지 축을 분석해 당신의 MBTI 유형과 간단한 설명을
          보여드립니다.
        </p>

        <form className="mt-8 rounded-3xl bg-surface p-6 ring-1 ring-hairline backdrop-blur-2xl" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
            이름
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              maxLength={30}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="예: 김민지"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "name-error" : undefined}
              className="w-full rounded-xl bg-surface-inset px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 ring-1 ring-hairline outline-none transition focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="brand-bg shrink-0 rounded-xl px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
            >
              검사 시작하기
            </button>
          </div>
          {error ? (
            <p id="name-error" className="mt-3 text-xs font-medium text-destructive">
              {error}
            </p>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">이름은 결과 화면에만 사용됩니다.</p>
          )}
        </form>
      </div>

      {/* right: what the result looks like */}
      <div
        className="rise-in rounded-3xl bg-surface p-7 ring-1 ring-hairline backdrop-blur-2xl"
        style={{ animationDelay: "120ms" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            결과 미리보기
          </span>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-hairline">
            예시
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="brand-fill grid size-14 place-items-center rounded-2xl font-display text-xl font-bold ring-1 ring-hairline">
            김
          </div>
          <div>
            <p className="text-sm text-muted-foreground">김민지의 유형</p>
            <p className="font-display text-3xl font-bold tracking-tight">INTJ</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          전략가형. 큰 그림을 보며 독립적으로 깊이 생각하고, 장기 목표를 위해 체계적으로 계획을
          세웁니다.
        </p>

        <div className="mt-6 space-y-4">
          {[
            { left: "I 내향", right: "E 외향", percent: 74 },
            { left: "N 직관", right: "S 감각", percent: 81 },
            { left: "T 사고", right: "F 감정", percent: 66 },
            { left: "J 판단", right: "P 인식", percent: 72 },
          ].map((row) => (
            <div key={row.left}>
              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                <span>{row.left}</span>
                <span>{row.right}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${row.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
