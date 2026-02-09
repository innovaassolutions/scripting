export interface Script {
  id: string;
  title_1: string;
  title_2: string;
  title_3: string;
  opening_hook: string;
  credibility_points: string;
  story_or_quote: string;
  key_point_1: string;
  key_point_2: string;
  key_point_3: string;
  key_point_4: string;
  key_point_5: string;
  point_1_details: string;
  point_2_details: string;
  point_3_details: string;
  point_4_details: string;
  point_5_details: string;
  helpful_ending: string;
  revenue_cta: string;
  revenue_cta_placement: string;
  shot_1: string;
  shot_2: string;
  shot_3: string;
  shot_4: string;
  shot_5: string;
  shot_6: string;
  created_at: string;
  updated_at: string;
}

export type ScriptInsert = Omit<Script, "id" | "created_at" | "updated_at">;
export type ScriptUpdate = Partial<ScriptInsert>;
