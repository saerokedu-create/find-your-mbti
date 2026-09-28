import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { StartScreen } from "@/components/StartScreen";
import {
  buildResult,
  QUESTIONS,
  type AnswerMap,
  type MbtiResult,
  type Pole,
} from "@/lib/mbti";

const ADVANCE_DELAY = 280;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Mindtype · 이름으로 보는 MBTI 16가지 유형 검사",
      },
      {
        name: "description",
        content:
          "이름을 입력하고 12개 문항에 답하면 4가지 축을 분석해 당신의 MBTI 유형과 강점·약점, 축별 성향을 바로 보여줍니다.",
      },
      { property: "og:title", content: "Mindtype · 이름으로 보는 MBTI 검사" },
      {
        property: "og:description",
        content: "이름 하나면 시작됩니다. 12문항, 3분, 그리고 당신의 4글자.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Step = "intro" | "quiz" | "result";

function Index() {
  const [step, setStep] = useState<Step>("intro");
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState<Pole | null>(null);
  const [result, setResult] = useState<MbtiResult | null>(null);
  const timer = useRef<number | null>(null);

  function clearTimer() {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function handleValidName(validName: string) {
    setName(validName);
    setStep("quiz");
  }

  function handleAnswer(pole: Pole) {
    if (pending !== null) return;

    const question = QUESTIONS[index];
    const nextAnswers: AnswerMap = { ...answers, [question.id]: pole };

    setAnswers(nextAnswers);
    setPending(pole);

    timer.current = window.setTimeout(() => {
      setPending(null);
      timer.current = null;

      if (index + 1 >= QUESTIONS.length) {
        setResult(buildResult(nextAnswers));
        setStep("result");
      } else {
        setIndex(index + 1);
      }
    }, ADVANCE_DELAY);
  }

  function handleBack() {
    clearTimer();
    setPending(null);
    setIndex((current) => Math.max(0, current - 1));
  }

  function handleRestart() {
    clearTimer();
    setStep("intro");
    setName("");
    setAnswers({});
    setIndex(0);
    setPending(null);
    setResult(null);
  }

  return (
    <AppChrome>
      {step === "intro" && <StartScreen onValidName={handleValidName} />}

      {step === "quiz" && (
        <QuizScreen
          question={QUESTIONS[index]}
          index={index}
          total={QUESTIONS.length}
          selected={pending}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {step === "result" && result && (
        <ResultScreen name={name} result={result} onRestart={handleRestart} />
      )}
    </AppChrome>
  );
}
