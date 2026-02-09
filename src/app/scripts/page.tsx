import Link from "next/link";
import Header from "@/components/Header";
import ScriptCard from "@/components/ScriptCard";
import EmptyState from "@/components/EmptyState";
import { supabase } from "@/lib/supabase";
import type { Script } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ScriptsPage() {
  const { data: scripts } = await supabase
    .from("scripts")
    .select("*")
    .order("updated_at", { ascending: false });

  const list = (scripts ?? []) as Script[];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dark-brown">
            Your Scripts
          </h2>
          {list.length > 0 && (
            <Link
              href="/scripts/new"
              className="bg-dark-brown text-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-dark-brown/90 transition-colors"
            >
              + New Script
            </Link>
          )}
        </div>

        {list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {list.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
