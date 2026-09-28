import { supabase } from "@/integrations/supabase/client";
import { AXES, MBTI_TYPES, type AxisReading, type MbtiResult } from "@/lib/mbti";

export async function saveResult(nickname: string, result: MbtiResult): Promise<void> {
  const { error } = await supabase.from("mbti_results").insert({
    nickname,
    mbti_code: result.code,
    axes: JSON.parse(JSON.stringify(result.axes)),
  });
  if (error) throw error;
}

export async function loadLatestResult(nickname: string): Promise<MbtiResult | null> {
  const { data, error } = await supabase
    .from("mbti_results")
    .select("mbti_code, axes")
    .eq("nickname", nickname)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const type = MBTI_TYPES[data.mbti_code];
  if (!type) return null;

  const axes = data.axes as unknown as AxisReading[];
  if (!Array.isArray(axes) || axes.length !== AXES.length) return null;

  return { code: data.mbti_code, type, axes };
}
