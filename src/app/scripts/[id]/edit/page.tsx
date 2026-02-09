"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import ScriptForm from "@/components/ScriptForm";
import type { Script } from "@/lib/types";

export default function EditScriptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/scripts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setScript)
      .catch(() => router.push("/scripts"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-charcoal/40">Loading...</p>
      </div>
    );
  }

  if (!script) return null;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-2xl mx-auto px-4">
        <h2 className="text-lg font-semibold text-dark-brown mb-5">
          Edit Script
        </h2>
        <ScriptForm initialData={script} />
      </main>
    </div>
  );
}
