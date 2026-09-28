export type Axis = "EI" | "SN" | "TF" | "JP";
export type Pole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type Option = {
  pole: Pole;
  label: string;
  detail: string;
};

export type Question = {
  id: number;
  axis: Axis;
  prompt: string;
  options: [Option, Option];
};

export type AxisInfo = {
  key: Axis;
  left: Pole;
  right: Pole;
  leftLabel: string;
  rightLabel: string;
  caption: string;
};

export type AxisReading = {
  axis: AxisInfo;
  dominant: Pole;
  dominantLabel: string;
  dominantPercent: number;
  minor: Pole;
  minorLabel: string;
  minorPercent: number;
};

export type MbtiResult = {
  code: string;
  type: MbtiType;
  axes: AxisReading[];
};

export type MbtiType = {
  code: string;
  alias: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
};

export const AXES: AxisInfo[] = [
  { key: "EI", left: "E", right: "I", leftLabel: "E 외향", rightLabel: "I 내향", caption: "에너지" },
  { key: "SN", left: "S", right: "N", leftLabel: "S 감각", rightLabel: "N 직관", caption: "정보 수집" },
  { key: "TF", left: "T", right: "F", leftLabel: "T 사고", rightLabel: "F 감정", caption: "결정" },
  { key: "JP", left: "J", right: "P", leftLabel: "J 판단", rightLabel: "P 인식", caption: "생활 방식" },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: "EI",
    prompt: "지친 하루 뒤, 에너지를 채우는 방식은?",
    options: [
      { pole: "E", label: "외향 E", detail: "사람들을 만나서 이야기한다" },
      { pole: "I", label: "내향 I", detail: "혼자만의 시간으로 회복한다" },
    ],
  },
  {
    id: 2,
    axis: "EI",
    prompt: "처음 가본 모임에서는?",
    options: [
      { pole: "E", label: "먼저 다가간다", detail: "반가운 얼굴을 찾아 말을 건다" },
      { pole: "I", label: "먼저 살펴본다", detail: "분위기를 파악한 뒤 움직인다" },
    ],
  },
  {
    id: 3,
    axis: "EI",
    prompt: "생각이 가장 잘 정리되는 순간은?",
    options: [
      { pole: "E", label: "말하면서", detail: "이야기하다 보면 답이 보인다" },
      { pole: "I", label: "머릿속에서", detail: "깊이 정리한 뒤에 말한다" },
    ],
  },
  {
    id: 4,
    axis: "SN",
    prompt: "새로운 것을 배울 때 먼저 보는 것은?",
    options: [
      { pole: "S", label: "구체적인 절차", detail: "예시와 순서를 따라간다" },
      { pole: "N", label: "전체 구조", detail: "원리와 가능성을 먼저 잡는다" },
    ],
  },
  {
    id: 5,
    axis: "SN",
    prompt: "이야기할 때 더 자주 하는 쪽은?",
    options: [
      { pole: "S", label: "지금 일어난 일", detail: "사실과 경험을 그대로 전한다" },
      { pole: "N", label: "될 수 있는 일", detail: "비유와 경우의 수를 보탠다" },
    ],
  },
  {
    id: 6,
    axis: "SN",
    prompt: "신뢰하는 판단의 근거는?",
    options: [
      { pole: "S", label: "검증된 데이터", detail: "숫자와 Previous 경험을 믿는다" },
      { pole: "N", label: "직관과 그림", detail: "연결해서 보이는 흐름을 믿는다" },
    ],
  },
  {
    id: 7,
    axis: "TF",
    prompt: "친구가 고민을 이야기하면?",
    options: [
      { pole: "F", label: "감정에 공감", detail: "먼저 마음이 어떤지 살핀다" },
      { pole: "T", label: "해결책 탐색", detail: "함께 방법을 찾아본다" },
    ],
  },
  {
    id: 8,
    axis: "TF",
    prompt: "중요한 결정을 할 때 더 무거운 것은?",
    options: [
      { pole: "T", label: "논리와 공정함", detail: "누가 봐도 타당한지가 먼저다" },
      { pole: "F", label: "사람과 가치", detail: "구성원의 마음과 신념이 먼저다" },
    ],
  },
  {
    id: 9,
    axis: "TF",
    prompt: "어떤 칭찬이 가장 기분 좋나요?",
    options: [
      { pole: "T", label: "실력 인정", detail: "결과와 판단이 좋았다는 말" },
      { pole: "F", label: "마음 인정", detail: "네가 있어 도움이 됐다는 말" },
    ],
  },
  {
    id: 10,
    axis: "JP",
    prompt: "여행을 간다면?",
    options: [
      { pole: "J", label: "미리 계획", detail: "코스와 시간을 정해 둔다" },
      { pole: "P", label: "가는 대로", detail: "그날 기분대로 정한다" },
    ],
  },
  {
    id: 11,
    axis: "JP",
    prompt: "마감이 있는 일은?",
    options: [
      { pole: "J", label: "미리 끝낸다", detail: "미루면 마음이 불편하다" },
      { pole: "P", label: "마지막 집중", detail: "기한 앞에서 힘이 생긴다" },
    ],
  },
  {
    id: 12,
    axis: "JP",
    prompt: "지금 당신의 책상은?",
    options: [
      { pole: "J", label: "제자리 있음", detail: "자리를 정해 두고 정리한다" },
      { pole: "P", label: "조금 흐트러짐", detail: "寻找하기만 하면 된다" },
    ],
  },
];

export const MBTI_TYPES: Record<string, MbtiType> = {
  ISTJ: {
    code: "ISTJ",
    alias: "확실한 실무자",
    summary: "약속과 절차를 지키는 데 가장 강한 유형입니다. 사실과 경험을 근거로 끝까지 해냅니다.",
    strengths: ["책임감", "정확함", "꾸준함"],
    weaknesses: ["변화에 느림", "고집", "감정 표현 서투름"],
  },
  ISFJ: {
    code: "ISFJ",
    alias: "든든한 보호자",
    summary: "조용하지만 남을 챙기는 데 누구보다 성실합니다. 작은 부탁도 오래 기억합니다.",
    strengths: ["배려", "인내", "세심함"],
    weaknesses: ["거절 어려움", "과한 책임감", "자기 의견 미룸"],
  },
  INFJ: {
    code: "INFJ",
    alias: "깊은 통찰가",
    summary: "말수보다 생각이 많은 이상주의자입니다. 사람과 일 뒤의 의미를 읽어냅니다.",
    strengths: ["직관", "신념", "공감"],
    weaknesses: ["완벽주의", "에너지 소진", "이념 갈등에 취약"],
  },
  INFP: {
    code: "INFP",
    alias: "조용한 꿈꾸는 사람",
    summary: "자신의 가치를 가장 소중히 여기는 상상력 많은 유형입니다. 타인의 감정에 깊이 공감합니다.",
    strengths: ["공감력", "창의력", "신뢰"],
    weaknesses: ["결정 지연", "과도한 자책", "현실 실행"],
  },
  INTJ: {
    code: "INTJ",
    alias: "전략가",
    summary: "큰 그림을 보며 독립적으로 깊이 생각하고, 장기 목표를 위해 체계적으로 계획을 세웁니다.",
    strengths: ["전략적 사고", "독립심", "높은 기준"],
    weaknesses: ["냉정해 보임", "출발이 늦음", "반복 업무 지루함"],
  },
  INTP: {
    code: "INTP",
    alias: "이론 탐구자",
    summary: "원리를 파헤치는 것을 즐기는 분석가입니다. 아이디어는 많지만 결정은 미루기 쉽습니다.",
    strengths: ["분석력", "호기심", "객관성"],
    weaknesses: ["실행 지연", "감정 표현", "일상 관리"],
  },
  ENTJ: {
    code: "ENTJ",
    alias: "지휘관",
    summary: "목표를 정하면 사람을 모으고 조직을 움직입니다. 효율과 속도에 강합니다.",
    strengths: ["추진력", "리더십", "문제 해결"],
    weaknesses: ["독선", "인내 부족", "감정 돌봄 부족"],
  },
  ENTP: {
    code: "ENTP",
    alias: "논쟁가",
    summary: "새로운 발상과 토론을 즐기며, 당연한 것에 계속 의문을 던집니다.",
    strengths: ["순발력", "아이디어 확장", "적응력"],
    weaknesses: ["시작만 많음", "세부 지루함", "말이 날카로움"],
  },
  ESTP: {
    code: "ESTP",
    alias: "모험가",
    summary: "지금 이 순간 몸을 움직여 해결하는 행동파입니다. 위기에서 오히려 침착해집니다.",
    strengths: ["실행력", "위기 대응", "사교성"],
    weaknesses: ["장기 계획", "참을성", "위험 과소평가"],
  },
  ESFP: {
    code: "ESFP",
    alias: "공연자",
    summary: "분위기를 살리는 사람입니다. 함께 있을 때 가장 빛나고 현재의 즐거움을 소중히 여깁니다.",
    strengths: ["따뜻함", "현장 감각", "친화력"],
    weaknesses: ["계획", "갈등 회피", "집중 유지"],
  },
  ESFJ: {
    code: "ESFJ",
    alias: "화합가",
    summary: "관계의 온도를 살피고 챙기는 데 능합니다. 함께 잘되는 일에 힘이 생깁니다.",
    strengths: ["배려", "조직력", "책임감"],
    weaknesses: ["타인 시선 부담", "갈등 스트레스", "자기 필요 미룸"],
  },
  ESTJ: {
    code: "ESTJ",
    alias: "경영자",
    summary: "질서와 기준을 세우고 끝까지 마무리하는 관리자입니다. 실무 운영에 강합니다.",
    strengths: ["실무 조직력", "추진", "원칙"],
    weaknesses: ["유연함 부족", "경청", "여유 부족"],
  },
  ISTP: {
    code: "ISTP",
    alias: "장인",
    summary: "도구와 원리를 손으로 익히는 조용한 해결사입니다. 즉흥적으로 대처하는 데 능합니다.",
    strengths: ["침착함", "문제 해결", "독립"],
    weaknesses: ["장기 관계 관리", "규칙 거부", "감정 표현"],
  },
  ISFP: {
    code: "ISFP",
    alias: "예술가",
    summary: "말보다 행동과 작품으로 표현하는 부드러운 감각가입니다. 미적으로 민감합니다.",
    strengths: ["심미안", "온화함", "즉흥성"],
    weaknesses: ["계획", "비판에 민감", "자기 주장"],
  },
  ENFJ: {
    code: "ENFJ",
    alias: "상담가",
    summary: "타인의 가능성을 먼저 보는 리더입니다. 사람들을 성장시키는 데서 힘을 얻습니다.",
    strengths: ["설득", "공감", "조직력"],
    weaknesses: ["과한 희생", "이상적 판단", "자기 소진"],
  },
  ENFP: {
    code: "ENFP",
    alias: "투사",
    summary: "가능성에 불이 붙는 열정적인 아이디어형입니다. 사람과 새로움에_Openly_ 반응합니다.",
    strengths: ["열정", "영감", "친화력"],
    weaknesses: ["계획 지속", "산만", "감정 기복"],
  },
};

export type AnswerMap = Record<number, Pole>;

export function buildResult(answers: AnswerMap): MbtiResult {
  const counts: Record<Pole, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const question of QUESTIONS) {
    const pole = answers[question.id];
    if (pole) counts[pole] += 1;
  }

  const axes: AxisReading[] = AXES.map((axis) => {
    const leftCount = counts[axis.left];
    const rightCount = counts[axis.right];
    const total = leftCount + rightCount;

    // Laplace smoothing keeps the bar away from a hard 0% / 100%.
    const leftPercent = total === 0 ? 50 : Math.round(((leftCount + 0.5) / (total + 1)) * 100);
    const rightPercent = 100 - leftPercent;

    const leftDominant = leftPercent >= rightPercent;
    const dominant = leftDominant ? axis.left : axis.right;
    const minor = leftDominant ? axis.right : axis.left;
    const dominantLabel = leftDominant ? axis.leftLabel : axis.rightLabel;
    const minorLabel = leftDominant ? axis.rightLabel : axis.leftLabel;
    const dominantPercent = Math.max(leftPercent, rightPercent);
    const minorPercent = 100 - dominantPercent;

    return {
      axis,
      dominant,
      dominantLabel,
      dominantPercent,
      minor,
      minorLabel,
      minorPercent,
    };
  });

  const code = axes.map((reading) => reading.dominant).join("");

  return { code, type: MBTI_TYPES[code], axes };
}
