import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { ScriptInsert } from "@/lib/types";

export async function GET() {
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body: ScriptInsert = await request.json();

  const { data, error } = await supabase
    .from("scripts")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
