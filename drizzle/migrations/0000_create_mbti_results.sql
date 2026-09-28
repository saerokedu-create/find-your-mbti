CREATE TABLE public.mbti_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT NOT NULL,
  mbti_code TEXT NOT NULL,
  axes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX mbti_results_nickname_idx ON public.mbti_results (nickname, created_at DESC);

GRANT SELECT, INSERT ON public.mbti_results TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mbti_results TO authenticated;
GRANT ALL ON public.mbti_results TO service_role;

ALTER TABLE public.mbti_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can save a result"
ON public.mbti_results
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read results by nickname"
ON public.mbti_results
FOR SELECT
TO anon, authenticated
USING (true);