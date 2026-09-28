CREATE TABLE public.mbti_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL,
  mbti_code TEXT NOT NULL,
  axes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX mbti_results_nickname_idx ON public.mbti_results (nickname);
CREATE INDEX mbti_results_created_at_idx ON public.mbti_results (created_at DESC);

GRANT SELECT, INSERT ON public.mbti_results TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mbti_results TO authenticated;
GRANT ALL ON public.mbti_results TO service_role;

ALTER TABLE public.mbti_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read results" ON public.mbti_results FOR SELECT USING (true);
CREATE POLICY "Anyone can insert results" ON public.mbti_results FOR INSERT WITH CHECK (true);