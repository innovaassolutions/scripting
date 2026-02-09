import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ScriptView from "@/components/ScriptView";
import type { Script } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ScriptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return <ScriptView script={data as Script} />;
}
