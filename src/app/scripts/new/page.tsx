import Header from "@/components/Header";
import ScriptForm from "@/components/ScriptForm";

export default function NewScriptPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-2xl mx-auto px-4">
        <h2 className="text-lg font-semibold text-dark-brown mb-5">
          New Script
        </h2>
        <ScriptForm />
      </main>
    </div>
  );
}
