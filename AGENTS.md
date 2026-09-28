<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Design system

All colors, fonts, gradients and shadows are semantic oklch tokens in `src/styles.css`;
components reference them via Tailwind utilities (`bg-surface`, `ring-hairline`, `brand-bg`).
Never hardcode a color utility (`text-white`, `bg-[#…]`) — it bypasses the single dark theme
and breaks the frosted-glass layering.

## Ambient background

`AppChrome` owns the drifting gradient light layer and the page chrome, and clips it with
`overflow-clip`. Use `overflow-clip`, never `overflow-hidden`, on that wrapper: `overflow-hidden`
turns it into a scroll container, and focus/scroll-restoration can slide the whole page sideways.

## Test data

MBTI questions, the 16 type texts, and scoring live in `src/lib/mbti.ts`; routes and components
only consume `QUESTIONS` / `buildResult`. Keeping them out of components makes the wording
reviewable and the result screen free of data logic.

## Result persistence

Completed results are saved to the `mbti_results` table (nickname, mbti_code, axes JSONB) via
`src/lib/results.ts` (`saveResult` / `loadLatestResult`). On name submit, an existing saved result
for that nickname skips the quiz and shows the result directly. No auth: anon INSERT/SELECT policies
are intentional for this nickname-keyed app.
